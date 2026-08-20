# PCPD-42 discovery research: floorplan detection improvements

Research code for [PCPD-42](https://inivi.atlassian.net/browse/PCPD-42) ("Improve floorplan room-detection accuracy
and extract more quoting-relevant detail"). Each script is a re-runnable prototype/harness for one of the ticket's
three angles, plus the findings from actually running them against real floorplan images. The full discovery report
(all three angles, prioritized recommendations) is a separate deliverable outside this repo; this README covers only
what the code here specifically found.

**No customer drawing content, file paths, or addresses appear in the text below or in the scripts** — findings are
described as patterns ("a chained dimension string", "a red ceiling-height callout"), not verbatim excerpts. Every
script takes `--image`/`--pdf` and was tested locally against real customer take-off drawings (rasterized at 200 DPI,
matching production) and against this repo's own `tmp/` sample images; none of that source image/PDF data is
committed here. The `screenshots/` directory **does** commit rendered overlay PNGs from those real drawings (see
below) — every one has had its address, client name, lot number, and permit/surveyor stamp blacked out before being
saved; only the floor plan geometry and generic drawing notes remain.

This research was done in two passes. **Everything in the "Second pass" section below corrects or supersedes framing
from the first pass** — most importantly, the original room-detection findings undersold how bad the room-merging
problem actually is (see "Corrected room-detection framing"). Read that section first.

## Second pass: corrections and additional findings

### Corrected room-detection framing — the first pass's room counts were misleading

The first pass reported results like "7 labeled, 7 unknown, 14 total rooms" and treated the labeled count as a rough
proxy for "how many rooms came out usable." Re-examining the actual overlay images side-by-side with the real
drawings (not just the summary numbers) shows that framing understates the failure substantially, in a way worth
being explicit about:

**A "labeled" room is only actually usable if it is its own distinct, correctly-shaped polygon.** The `label` field
production renders in the UI/overlay is only the *first* OCR seed that happened to land in a region — when a wall-mask
leak merges several real rooms into one flood-filled blob, every merged room's name lands in a `merged_labels` list
that **is not rendered anywhere in the overlay and is not shown to the user** (`_render_floorplan()` in
`ocr_flood_fill_smoothed.py` draws only `room["label"]`). So a room that is technically "labeled" by being folded
into someone else's `merged_labels` is, from what the product actually shows a user, indistinguishable from a room
that was never detected at all — both render as nothing.

Doing a full manual room-by-room accounting against `screenshots/01_room_merging_and_dropout_native_729plimsoll.png`
(cross-checked against the real drawing) for a single-storey house with roughly 18 distinct labelled room-instances
on the source drawing:

| Outcome | Count | Rooms |
| --- | --- | --- |
| Own distinct, correctly-labeled polygon | ~6 | Bed 2, Bed 4 (with a robe silently folded in), a robe/Bed-3 pair, both WIRs, Bath (OCR-mangled to "Bathl") |
| Geometrically found, but unlabeled ("Unknown") | ~7 | both ensuites, laundry, and other small fragments — present as a shape, needs full manual re-labeling |
| Buried in another room's `merged_labels`, invisible in the UI | ~4 | Family, Lounge, Master Bedroom, one robe — their names exist in the JSON but nothing on screen shows them as separate spaces |
| **Completely absent — no seed, no fallback region, no trace anywhere** | **~3–4** | **Garage, Kitchen, Entry, Porch** |

Repeating this against `screenshots/05_room_merging_25taihu.png` (a second, different house) found the **same
pattern with the same two specific rooms recurring**: Kitchen merges invisibly into an open-plan blob (`merged_labels`
there reads `['Dining', 'Kitchen', 'Family', 'Linen 2']`) and **Garage is again completely absent** — not merged, not
"Unknown", not present anywhere in the output. Garage vanishing entirely and Kitchen disappearing into a merge are
not one-off flukes; they reproduce identically across two unrelated houses from two different drafting offices.
`screenshots/06_numbered_room_failure_76scott.png` (the boarding house) shows the same Kitchen-swallowed-into-a-merge
pattern a third time (`merged_labels: ['Living', 'Entry', 'Kitchen']`), on top of its already-reported near-total
labeling failure.

**Root cause found for two of these specific disappearances (Kitchen, Entry)**: pulling the real drawing's own PDF
text layer (see "PDF text-layer extraction" below) shows several room labels on this drawing are rendered **rotated
90°** — "Kitchen", "Entry", "Porch", "L'Dry", and "Ens" among them. Neither OCR engine, as configured in production
(`ocr/service.py`'s plain `reader.readtext(image_rgb)`, no rotation handling), detects rotated text at all — both
`easyocr` and `paddleocr` found only two unrelated, horizontally-printed *mentions* of "kitchen" and "entry" in
regulatory note paragraphs elsewhere on the page, never the actual rotated room label (`compare_ocr_engines.py
--keyword kitchen` output, both engines, reproduced in full further down). This is a concrete, verified mechanism —
not a hypothesis — for why those specific rooms vanish: no OCR seed is ever placed inside them, so
`_rooms_from_seeds()` never attempts to flood-fill them, and they're too enclosed to seed from a duplicate elsewhere.

**Revised bottom line for angle 1**: on real drawings, something like a third to a half of a house's rooms come out
of the current pipeline as either completely invisible, buried inside another room's merge, or dumped into an
unlabeled "Unknown" bucket needing full manual correction. Only a minority land as directly usable, correctly-named
polygons. This is a meaningfully worse starting point for a user than "7 of 14 detected" suggested, and raises the
priority of both the wall-mask-leak/border-dropout fixes and (new in this pass) rotated-text handling.

### Alternative OCR engine: PaddleOCR vs. easyocr (`compare_ocr_engines.py`)

Installed and ran `paddleocr` (PP-OCRv6) side-by-side with the production `easyocr` engine on the exact three
failure cases already found, not a synthetic benchmark:

1. **Numbered-room drawing** (the boarding house's "Room 1".."Room 8" labels): easyocr truncated two of the eight —
   reading bare `'ROOM'` with the digit silently dropped for "Room 1" and "Room 7" — while paddleocr read all eight
   correctly and found a ninth ("ROOM3") easyocr missed entirely. **Real, measured win for paddleocr** — but it does
   **not** fix the underlying problem: `"room"` is not a keyword in `ocr/keywords.py`, so even a perfectly-read
   "ROOM 3" still fails to seed a labeled room. Engine choice alone does not fix this failure mode.
2. **Space-separated-thousands truncation** (e.g. a drawing's "1 550" read back missing its leading digit):
   confirmed as a real, repeated easyocr failure — `'810'` vs paddleocr's correct `'8810'`, `'650'` vs `'3 650'`,
   `'470'` vs `'6 470'`, `'960'` vs `'1 960'` (twice), and several bare `'000'` reads (leading digits dropped
   entirely) where paddleocr got the full value. Not every case favoured paddleocr — one value came back as
   easyocr's `'5550'` vs paddleocr's `'550'`, arguably the reverse error — but the truncation pattern was
   overwhelmingly one-directional across a full-page comparison (dozens of instances). Paddleocr also detected
   **far more dimension tokens overall** than easyocr found in the same region, consistent with easyocr additionally
   struggling with the rotated/vertical dimension chains common on these drawings (see rotation testing, below).
3. **Punctuation-variant label noise** (the same "Ens." room label read as five different strings): **completely
   and cleanly fixed by paddleocr** — all five real instances of the same physical label came back as the identical
   string `'ENS.'` at 1.00 confidence every time, where easyocr had produced `ENS.`, `ENS,`, `ENS`, `ENS.` (different
   confidence), and `ENS_` for the same five rooms.

**Cost**: paddleocr is substantially slower — roughly 3–5x easyocr's wall-clock time per page in this environment
(e.g. 62.5s vs 12.8s on one dense drawing), plus a one-time model download on first use. Given production's OCR step
is already a meaningful share of total per-page processing time, a wholesale engine swap is a real latency/cost
trade-off, not a free upgrade — but the accuracy difference on real content, especially the clean fix for
punctuation-noise duplicate labels, is large enough to be worth prototyping as a real follow-up, at least as an
option rather than a blanket replacement.

Run: `../../venv/bin/python3 compare_ocr_engines.py --image <path> [--keyword kitchen] [--easyocr-rotation-info]`

### Rotated-text handling — tested explicitly, not assumed

Architectural drawings run dimension chains and (as found in this pass) some room labels vertically along the
page margins. Tested whether this specifically degrades each method's accuracy:

- **PDF text layer**: verified correct on both axes that matter. Content is trivially rotation-proof (it's encoded
  characters, not pixels) — but *position* handling could still have been wrong, so this was checked directly, not
  assumed: `page.get_text("dict")`'s per-span `dir` vector correctly reports `(0.0, -1.0)` for genuinely rotated
  spans, and their bounding boxes are correctly tall/narrow rectangles at the true rotated position on the page
  (cross-checked: a rotated "Kitchen" span's PDF-layer bbox, converted to 200 DPI pixel space, predicted a center
  within 2px of where `easyocr`'s rotation-aware pass independently found the same word). Note: a naive first
  attempt at this check used bounding-box aspect ratio (tall vs. wide) as a rotation proxy and got misleading
  results — many short *horizontal* words ("is", "to", "&") are naturally taller than wide at normal font sizes,
  which looks like "vertical" by that heuristic but isn't. The `dir` vector is the correct signal; aspect ratio is
  not.
- **easyocr and paddleocr, as configured in production/this research (no rotation handling enabled)**: both
  **completely miss** rotated text. Verified directly on the rotated "Kitchen" and "Entry" labels found via the PDF
  text layer — neither engine's default output contains them at all, only unrelated horizontal mentions of the same
  words elsewhere on the page.
- **easyocr with `rotation_info=[90, 180, 270]`**: does find the real rotated "Kitchen" (conf 0.73) and "Entry"
  (conf 1.00) labels — positions verified against the PDF text layer's independently-computed locations, confirming
  these are genuine finds, not noise. **Cost: roughly 7.2x the OCR wall-clock time** (10.6s → 77.0s on one drawing).
  A real, working, one-parameter fix — but an expensive one, and strictly dominated by the PDF text layer wherever
  a text layer is available (near-instant, and it was already going to be read anyway for dimension strings).

### PDF text-layer extraction — actually prototyped and measured, not just proposed (`extract_dimensions_from_pdf_text_layer.py`)

The first pass flagged this as "high-confidence" without running it. This pass built it and ran a genuine three-way
comparison — text layer vs. easyocr vs. paddleocr — on the same real pages already used for the OCR comparison above.

- **Coverage measured across all 5 real take-off jobs available for this research**: of 85 total PDF pages, **75
  (88%) have an embedded, extractable text layer**. The split is clean and bimodal, not uniform: every multi-page
  "Architectural Drawings" CAD export (the actual working-drawing sets with dimensions, room labels, and schedules —
  exactly the content angles 2 and 3 care about) has a **100%** text layer; every smaller single-page derivative
  file (the business's own flattened/exported summary or markup pages) has **0%**. In practice, this means:
  text-layer extraction is close to universally applicable to the primary architectural drawing content in this
  sample, but not to every file a job folder contains, and a fallback is still required. This is a 5-job sample, so
  treat the exact 88% as illustrative of this business's drafting-office mix, not a general guarantee.
- **On values both methods can read, the text layer is exact where OCR is approximate** — expected, since it's
  reading encoded PDF text rather than pixels, but now quantified on real content rather than asserted: extraction
  itself takes under 1 millisecond per page (no model, no inference) versus multiple seconds for either OCR engine,
  and every dimension value it returns matches the drawing exactly, with zero digit-truncation risk.
- **Rotation is where the text layer's advantage is largest in practice**, not just in principle — see above: it is
  the only one of the three methods that finds rotated content (dimension chains *and* room labels) at both zero
  extra engineering cost and effectively zero extra runtime cost, where both OCR engines either miss rotated text
  entirely (default config) or pay a 7x time penalty to catch some of it (`rotation_info`).
- **Still not a full replacement for OCR**: the 12% of pages with no text layer (scanned/flattened single-page
  files) need OCR regardless, and even on vector pages, any annotation added as a raster image rather than native
  PDF text (a scanned stamp, a hand-markup layer) would still need OCR. The realistic design is "prefer text layer
  where available, fall back to OCR," not "replace OCR."

Run: `../../venv/bin/python3 extract_dimensions_from_pdf_text_layer.py --pdf <path> --page <n> [--compare-ocr]`

### Alternative segmentation model: Segment Anything (SAM), installed and run for real (not just researched)

Literature check first: recent (2025) work — FloorSAM, "Segmenting Anything in Architecture," a few-shot
SAM-for-floorplans paper — specifically validates SAM-family models for point-prompted room segmentation, which
matters here because **production already has a free point prompt for every room it detects**: the OCR seed
coordinate. No other credible, *installable-today* alternative turned up — CubiCasa5k's own improved model is what
this repo already runs, and the other floorplan-segmentation GitHub projects found (e.g.
`ozturkoktay/floor-plan-room-segmentation`) ship training code and architecture only, with **no pretrained weights
available for download** — using them would mean training from scratch on annotated floorplan data, which is real,
substantial future work (data collection/licensing, GPU training time), not a same-pass feasibility test, and is
called out here as exactly that rather than glossed over.

SAM was different: installed `transformers` and pulled `facebook/sam-vit-base` (the smallest official SAM checkpoint,
~375MB, auto-downloaded from HuggingFace) and ran it directly against a real drawing, prompted at two of production's
own real OCR seed coordinates:

- **Prompted at the "Garage" seed — one of the rooms production drops completely (see above)**: SAM's largest
  returned mask is a clean, accurate, tightly-fitted polygon of the entire garage, matching its true boundary almost
  exactly — see `screenshots/04a_sam_alternative_garage_success.png`. A general-purpose foundation model with **zero
  floorplan-specific training** correctly segmented, from one point, the exact room the purpose-built floorplan
  model's pipeline drops silently.
- **Prompted at the "Meals" seed — the room at the center of the worst merge failure**: mixed, genuinely informative
  result. SAM returns three candidate masks per prompt; neither the highest-IoU-score mask (a near-noise 1067px
  sliver) nor the largest-area mask (itself an over-merge spanning more than half the house, arguably worse than
  production's own blob) was usable automatically. The **middle** candidate, however —
  `screenshots/04b_sam_alternative_meals_partial.png` — is a genuinely good result: a clean Kitchen+Meals+Family
  open-plan boundary that correctly stops before the bedroom wing, arguably *more* accurate than production's own
  merged blob (which incorrectly reaches all the way to a separate Lounge room). **Automatic mask selection among
  SAM's multiple candidates is a real, unsolved problem in this quick test** — picking "highest score" or "largest
  area" both failed here; something smarter (e.g. cross-referencing the existing wall-mask CNN output, or a
  plausible-room-area prior) would be needed before this is usable unattended.
- **Speed**: fast enough to be practical — 0.65–0.7s per prompt on CPU after a one-time ~3s model load (using the
  smallest checkpoint on a full 3307×2339px page), i.e. comparable to or cheaper than the existing hourglass CNN's
  own inference cost per page.

**Assessment**: this is the most promising untried idea to surface in either research pass, not a padded literature
note — it is installed, run, and produces a striking, verified win on exactly one of the failure modes found in
angle 1, using infrastructure (an OCR seed point) production already computes. It is not turnkey: mask selection
needs real engineering, and this was tested as a standalone experiment, not integrated into the actual flood-fill
pipeline. Worth a dedicated follow-up spike, specifically on the mask-selection problem, before deciding whether to
build it into production.

Prototype scripts are not committed for this experiment (it was run directly against `transformers`' `SamModel`
in a scratch script) — the exact calls are reproducible with `transformers.SamModel.from_pretrained("facebook/sam-vit-base")`
and `SamProcessor`, prompted with `input_points=[[[x, y]]]` at a real OCR seed coordinate; see the screenshots for
what the output looks like.

### Screenshots

`screenshots/` (committed, addresses/client names/permit numbers redacted with solid black boxes over the source
drawings' title blocks and identifying callouts — verify this holds if you add more):

| File | Shows |
| --- | --- |
| `00_source_drawing_729plimsoll_redacted.png` | The real source drawing, unannotated, for reference against the overlays below |
| `01_room_merging_and_dropout_native_729plimsoll.png` | Production's actual output at native resolution — the giant merged blob and the blank (undetected) garage, both visible directly |
| `02a_downscaled_fit768_729plimsoll.png` / `02b_downscaled_fit1536_729plimsoll.png` | Same drawing, resized before inference — visibly *fewer* correctly-shaped rooms than native, not more |
| `03_multiscale_averaged_729plimsoll.png` | The multiscale-averaged variant — same merge failure, cleaner small-room fragments |
| `04a_sam_alternative_garage_success.png` / `04b_sam_alternative_meals_partial.png` | SAM's point-prompted results on the same drawing |
| `05_room_merging_25taihu.png` | The same merge-and-garage-dropout pattern reproduced on a second, unrelated house |
| `06_numbered_room_failure_76scott.png` | The boarding house — nearly every room renders as unlabeled "Unknown" |
| `07_cornice_note_8darter.png` | A real "selected cornice to specification" construction note, the kind `scan_drawing_notes_for_quoting_attributes.py` extracts |
| `08_ceiling_height_fcl_8darter.png` | A real section-view "FCL" ceiling-height annotation with its reduced-level dimension line |
| `09_door_window_schedule_8darter.png` | A real door/window schedule sheet, showing exact per-door mm widths (the basis for the angle-2 door-width cross-check idea) |

## First-pass scripts and findings

### `catalog_segmentation_failures.py` — room-detection accuracy

Runs the _actual_ production room-extraction code (`OcrFloodFillSmoothedStrategy`'s private helpers, imported
directly, not reimplemented) with the model's input resolution varied: the native-resolution baseline (what
production does today — `inference/preprocess.py`'s `prepare(image)` with no resize, just rounded up to the next
multiple of 32), several smaller `fit_long` sizes, and a multiscale-logit-average variant (the idea behind the
abandoned `inference/strategies/multiscale.py`, adapted to the current wall-mask/flood-fill pipeline instead of the
heatmap-polygon path it was originally built against). OCR runs once and its seeds are reused across every variant,
so differences are attributable to segmentation resolution alone.

**See "Corrected room-detection framing" above before trusting the room-count numbers below** — they're accurate as
counts, but "labeled" undersells how much of that is actually unusable (buried in a merge, invisible in the UI).

**Findings, run against three real houses (a project home, a project-home duplicate-of-duplex, and a boarding
house/multi-unit dwelling) plus this repo's `tmp/` samples, all 200 DPI A2/A3-equivalent rasterized pages
(3300–4700px per side):**

- **Downscaling before inference makes room detection _worse_, not better, on every image tested.** Labeled-room
  count dropped monotonically as `fit_long` decreased (e.g. one house went from 7 labeled rooms at native resolution
  to 2 at `fit_long=768`). This is the opposite of what the abandoned `fit_scale.py`/`multiscale.py` docstrings'
  stated rationale would predict ("the network was trained on ~256–512px crops, so a huge native-resolution input
  should confuse it") — empirically, on these three drawings, native resolution preserved small/thin wall lines
  (between tightly-packed ensuites, robes, etc.) that got blurred away entirely at lower resolutions, causing OCR
  seeds for those small rooms to flood-fill into a neighbouring room or the exterior and get discarded instead of
  recovering a smaller, correct region. **This is a plausible reason the abandoned resize/multiscale strategies never
  got adopted — resizing down looks like it would have made results worse on drawings like these, not better** —
  though no comment in the repo confirms this was the actual reason at the time.
- **Multiscale-logit averaging (native + several smaller scales, averaged before argmax) is a more nuanced result: it
  matched native resolution's labeled-room recall exactly while producing noticeably fewer spurious "unknown
  closed-region fallback" fragments** (e.g. 3 vs 7 unknown fragments on one test image, with the same 7 labeled
  rooms), at roughly 1.4x the inference wall-clock cost of native alone (four forward passes instead of one). This is
  a genuine, if modest, win worth a closer look — it did **not**, however, fix the most damaging failure mode below.
- **The single most damaging failure mode found: wall-mask leaks silently merge multiple real rooms into one giant
  region.** On one test image, a flood-filled region covering ~5.8% of the entire page merged what should have been
  three-plus separate rooms (confirmed via the `merged_labels` field, not just the overlay render) — including at
  least one pair that has a real dividing wall on the source drawing, so this is a genuine wall-detection gap, not a
  correctly-merged open-plan area. This happened identically at every resolution tested, including the multiscale
  average — **resolution/TTA changes do not fix this failure mode.**
- **A second, related failure: large exterior openings can let flood-fill leak past the building envelope entirely,
  silently dropping the whole room.** A garage with a very wide (>4m) door opening, and its adjacent kitchen, never
  appeared in the output at all on one test image — not even as an "unknown" fallback region — consistent with the
  flood fill leaking out through the under-closed door opening to the surrounding blank page, then being discarded
  by the existing "touches image border" rejection rule. **Now reproduced on a second house** — see "Corrected
  room-detection framing" above.
- **OCR-seed label noise**: on one drawing, the same room ("Ensuite") produced four different labels (`Ens,`, `Ens.`,
  `Ens_`, `Ensuite`) because OCR read the same abbreviation with different trailing punctuation across different
  instances, and label normalization (`ocr/service.py`'s `_label_from_text`) only special-cases a handful of exact
  strings, not punctuation-stripped ones. **Now with a measured fix** — see the PaddleOCR comparison above, which
  reads all five instances identically.
- **Most severe result, and arguably the most important finding of this angle: on the boarding-house/multi-unit
  drawing, only 1 of 19 flood-filled regions got a real label (18 fell back to "Unknown").** That drawing labels most
  rooms with generic numbering ("Room 1", "Room 2", ...) rather than descriptive English words — and generic numbers
  are not, and structurally cannot be, in `ocr/keywords.py`'s fixed keyword list. This is not a resolution or model-
  accuracy problem at all: **the entire room-labeling mechanism is structurally dependent on OCR finding one of a
  fixed set of English descriptive keywords, and fails almost completely on drawings that label rooms differently**
  (numbered rooms, unit numbering, non-English labels, or just uncommon synonyms). The existing
  `_unknown_rooms_from_closed_regions` fallback already finds the _geometry_ of these rooms correctly (19 regions
  found) — it just never attempts a CNN-based room-type label for them the way the OCR-seeded path does via
  `_get_room_type`. Wiring that in is a small, concrete, high-leverage fix, and it reuses exactly the technique the
  abandoned `mask_rooms.py`/`segmap_rooms.py` strategies already implemented (segmap-connected-component rooms with
  CNN-based majority-vote typing) — those strategies are not a dead end so much as an already-built fallback that
  was never connected to the path that needs it.

Run: `../../venv/bin/python3 catalog_segmentation_failures.py --image <path> --fit-longs 768,1024,1536 --multiscale`

### `estimate_scale_from_drawing.py` — automatic scale detection

Two independent scale-estimation methods, both on infrastructure the repo already has:

1. **Dimension-chain OCR**: clusters OCR'd numeric tokens that align into a straight horizontal/vertical run (a
   dimension chain), and for each chain compares the _sum_ of its labelled mm values to the _pixel span_ the chain's
   text covers.
2. **Door-width cross-check**: matches the model's detected door icon polygons to nearby standalone OCR numbers in a
   plausible door-width range, using label_mm / door_pixel_width per matched door.

**Validation method**: for a 200 DPI render of an A3 (420×297mm) architectural sheet stated as drawn at "1:100", the
ground-truth scale is derivable independent of OCR: `25.4mm/inch ÷ 200dpi × 100 (plot scale) = 12.7mm/px` — this
holds only if the sheet was plotted at its stated scale with no extra fit-to-page shrink, which the rendered page
coming out at exactly A3 size corroborates. Both methods were scored against this derived ground truth on two
different real drawings.

**Findings:**

- **Dimension-chain OCR is directionally correct and usable as a rough cross-check, not yet precise enough to trust
  outright: -5.5% error on one drawing, -28.5% on another** (median across all detected chains on each). The error is
  not random — it has a clear, consistent, mechanistic explanation: the script approximates a chain's pixel span
  using its OCR text bounding boxes' outer edges, but dimension text sits inset from the actual tick marks it labels,
  so the estimate systematically _understates_ the true span. That bias is small for a chain with few, large segments
  and compounds badly for a chain with many small filler segments (e.g. repeated ~90mm stud-allowance gaps). **On
  both test drawings, the single most accurate individual chain was the coarsest one available (fewest tokens,
  largest average segment) — one came out at -2.6% error, well within usable range.** A "prefer the chain with the
  fewest tokens / largest average segment" selection heuristic, or better, detecting actual tick-mark/extension-line
  pixel positions via classical CV instead of text-bbox edges, is the concrete next step this points to.
- **OCR reliability on real dimension strings, observed directly**: most clean 2–4 digit numbers read at
  90–100% confidence. But space-separated thousands values (a common convention, e.g. "1 550" for 1550mm)
  occasionally get truncated — the leading digit silently dropped, reading "550" where the drawing says "1 550" —
  which would silently corrupt a scale estimate by exactly a factor tied to the missing digit if not cross-validated.
  Occasional single-digit misreads also occurred (a token that should almost certainly have been "5 500" read as
  "5550" instead). Any production use of this technique needs multi-chain cross-validation (agreement across several
  independent chains), not a single trusted reading. **See the PaddleOCR and PDF-text-layer comparisons above for
  two different, measured ways to reduce this specific error.**
- **The door-width cross-check failed outright on both test drawings and should be considered a dead end as
  currently implemented, not a promising lead.** Detected door icon bounding boxes came out only 4–20px wide, where
  a real ~800mm door at the true scale should measure roughly 60px — implausibly small on every match, on both
  images. This was tried two ways: first reading the icon-class argmax the way `ocr_flood_fill_smoothed.py`'s
  `_sink_icons` reads sinks (produced near-single-pixel noise), then switching to the model's proper heatmap-based
  polygon extractor (`polygons_from_predictions`, the same path the abandoned `analyse`/`debug_get_polygons`
  endpoints use) — which fixed nothing, ruling out "wrong extraction method" as the cause. The doors themselves _are_
  reliably mm-labelled directly on these drawings (confirmed by eye on multiple real drawings, e.g. door swings
  individually labelled 720/820/920/1200mm) so the idea is sound; the blocker is that this model's door/icon
  detection itself appears to produce implausible geometry at the native resolution production runs at — the same
  resolution-mismatch suspect as the room-merging failures found in `catalog_segmentation_failures.py`. Worth
  isolating and confirming (e.g. visualizing raw door detections in isolation) before investing further here, rather
  than assuming the cross-check idea itself is the problem.

Run: `../../venv/bin/python3 estimate_scale_from_drawing.py --image <path> [--known-scale-mm-per-px 12.7]`

### `scan_drawing_notes_for_quoting_attributes.py` — quoting-relevant room attributes

Pattern-matches OCR text against three signal types found by manually inspecting real take-off drawings (floor
plans, section views, and construction-detail sheets): ceiling-height call-outs, cornice/no-cornice finish notes,
and wet-area standard references. Deliberately simple regex/keyword matching, not a trained model — the point is to
test _whether the signal is extractable at all_ from a 200 DPI rasterized page via the OCR infrastructure already in
production, not to ship a production parser.

**Findings:**

- **All three signal types were confirmed present on real drawings and successfully extracted by this script**,
  each on a different real drawing/page (see `screenshots/07_cornice_note_8darter.png` and
  `screenshots/08_ceiling_height_fcl_8darter.png` for two of the three, actually rendered):
    - A ceiling-height call-out written directly on a floor plan next to a raised/feature-ceiling room (a value in mm
      next to the word "ceiling") — matched at 0.92 OCR confidence, but only via the script's windowed multi-detection
      join, because OCR split the number and the word "Ceiling" into two separate text boxes. The single-detection-only
      matcher alone would have missed it entirely.
    - A section-view ceiling-height annotation using the "FCL" (finished ceiling level) abbreviation next to a metres
      value — also matched at 0.92 confidence, independently cross-checked by hand against the same section's two
      reduced-level figures (their difference matched the stated height exactly).
    - A cornice construction note ("Selected cornice to specification") in a wall/ceiling detail sheet, read as a
      single OCR box at 0.75–0.77 confidence — no windowing needed for this one.
- **A raked-ceiling legend note ("dashed area indicates raked ceiling...") was visually confirmed on a real drawing
  but not caught by this script** — it only pattern-matches raked-ceiling and cornice/square-set keywords against
  single OCR detections, not the windowed join used for ceiling-height patterns, so a phrase OCR splits across boxes
  is missed. Extending the same windowing to every category, not just ceiling height, is a one-line-per-category fix
  and the obvious next step.
- **These findings connect directly to existing, mostly-unused schema**: `AreaPolygon.ceilingHeightMm` and
  `FloorplanPage.ceilingHeightMm` already exist (`libraries/plaster-calculator-common/src/geometry/schemas/`), there
  is already a `ceilingMode: "flat" | "raked"` field with a full `RakedCeiling` shape (low/high edge + height), and
  there is already a readiness check + fix-control UI nudging the user to enter ceiling height by hand
  (`ceiling-height-set.resolver.ts`, `ceiling-height-fix-control.component.tsx`). None of this needs a schema
  change — the gap is entirely that these fields can only be filled in by hand today.
- **Cornice length is already auto-computed** (`corniceLengthQuantity()` in
  `libraries/plaster-calculator-common/src/takeoff/quantity-takeoff-calculator.utils.ts` sums every room's full
  perimeter) — but with **no way to exclude a room from cornice**, even though real take-off records (see the
  broader discovery report) track a distinct "square set" line item specifically because those rooms get _no_
  cornice. So the concrete gap for cornice is not "detect a quantity" (done) but "detect which rooms/edges should be
  _excluded_" — exactly the square-set/shadowline signal this script already demonstrates it can find in a
  construction-detail note.
- **The existing wet-area default has a specific, confirmed coverage gap**: `defaultWallBoardTypeForRoom` in
  `functions/plaster-calculator-functions/src/analyzer.ts` only special-cases room type `"Bath"`. But
  `ocr/keywords.py`'s own keyword table already produces the distinct room types `"Toilet"` and `"Laundry"` from OCR
  text (`"wc"`, `"toilet"`, `"powder"` → `"Toilet"`; `"laundry"`, `"ldry"` → `"Laundry"`) — both unambiguously wet
  areas in practice, per the "AS 3740" standard reference this script also confirms is readable directly off these
  drawings — and neither gets water-resistant board today. This is a same-day fix in `analyzer.ts` alone (extend the
  room-type check), independent of anything else in this research.

Run: `../../venv/bin/python3 scan_drawing_notes_for_quoting_attributes.py --image <path>`

## Cross-cutting observation

Two independent angles (room-merging in angle 1, door-icon detection in angle 2) both point at the same underlying
suspect: the model runs in production at native image resolution (commonly 3300–4700px/side for a 200 DPI A2/A3
page) against a network whose own abandoned-strategy documentation says it was trained on ~256–512px crops. The
room-detection experiments here found that naively downscaling made results _worse_, not better, so the fix is
unlikely to be as simple as "resize before inference" — but the resolution mismatch itself remains a plausible
common root cause worth investigating directly (e.g. fine-tuning, or a smarter multi-crop/tiling approach that
doesn't lose small-room wall detail) before either failure mode is treated as fully independent. **The SAM
experiment above is a second, independent path around the same underlying limitation** — a foundation model with no
training on this domain at all, prompted at the same resolution, cleanly solved one of the two disappearing-room
cases the purpose-built model fails on.
