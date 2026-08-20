# PCPD-42 discovery research: floorplan detection improvements

Research code for [PCPD-42](https://inivi.atlassian.net/browse/PCPD-42) ("Improve floorplan room-detection accuracy
and extract more quoting-relevant detail"). Three scripts, each a re-runnable prototype/harness for one of the
ticket's three angles, plus the findings from actually running them against real floorplan images. The full
discovery report (all three angles, prioritized recommendations) is a separate deliverable outside this repo; this
README covers only what the code here specifically found.

**No customer drawing content, file paths, or addresses appear below or in the scripts** — findings are described as
patterns ("a chained dimension string", "a red ceiling-height callout"), not verbatim excerpts. Every script takes
`--image <path>` and was tested locally against real customer take-off drawings (rasterized at 200 DPI, matching
production) and against this repo's own `tmp/` sample images; none of that image data is committed here.

## Scripts

### `catalog_segmentation_failures.py` — room-detection accuracy

Runs the *actual* production room-extraction code (`OcrFloodFillSmoothedStrategy`'s private helpers, imported
directly, not reimplemented) with the model's input resolution varied: the native-resolution baseline (what
production does today — `inference/preprocess.py`'s `prepare(image)` with no resize, just rounded up to the next
multiple of 32), several smaller `fit_long` sizes, and a multiscale-logit-average variant (the idea behind the
abandoned `inference/strategies/multiscale.py`, adapted to the current wall-mask/flood-fill pipeline instead of the
heatmap-polygon path it was originally built against). OCR runs once and its seeds are reused across every variant,
so differences are attributable to segmentation resolution alone.

**Findings, run against three real houses (a project home, a project-home duplicate-of-duplex, and a boarding
house/multi-unit dwelling) plus this repo's `tmp/` samples, all 200 DPI A2/A3-equivalent rasterized pages
(3300–4700px per side):**

- **Downscaling before inference makes room detection *worse*, not better, on every image tested.** Labeled-room
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
  by the existing "touches image border" rejection rule.
- **OCR-seed label noise**: on one drawing, the same room ("Ensuite") produced four different labels (`Ens,`, `Ens.`,
  `Ens_`, `Ensuite`) because OCR read the same abbreviation with different trailing punctuation across different
  instances, and label normalization (`ocr/service.py`'s `_label_from_text`) only special-cases a handful of exact
  strings, not punctuation-stripped ones.
- **Most severe result, and arguably the most important finding of this angle: on the boarding-house/multi-unit
  drawing, only 1 of 19 flood-filled regions got a real label (18 fell back to "Unknown").** That drawing labels most
  rooms with generic numbering ("Room 1", "Room 2", ...) rather than descriptive English words — and generic numbers
  are not, and structurally cannot be, in `ocr/keywords.py`'s fixed keyword list. This is not a resolution or model-
  accuracy problem at all: **the entire room-labeling mechanism is structurally dependent on OCR finding one of a
  fixed set of English descriptive keywords, and fails almost completely on drawings that label rooms differently**
  (numbered rooms, unit numbering, non-English labels, or just uncommon synonyms). The existing
  `_unknown_rooms_from_closed_regions` fallback already finds the *geometry* of these rooms correctly (19 regions
  found) — it just never attempts a CNN-based room-type label for them the way the OCR-seeded path does via
  `_get_room_type`. Wiring that in is a small, concrete, high-leverage fix, and it reuses exactly the technique the
  abandoned `mask_rooms.py`/`segmap_rooms.py` strategies already implemented (segmap-connected-component rooms with
  CNN-based majority-vote typing) — those strategies are not a dead end so much as an already-built fallback that
  was never connected to the path that needs it.

Run: `../../venv/bin/python3 catalog_segmentation_failures.py --image <path> --fit-longs 768,1024,1536 --multiscale`

### `estimate_scale_from_drawing.py` — automatic scale detection

Two independent scale-estimation methods, both on infrastructure the repo already has:

1. **Dimension-chain OCR**: clusters OCR'd numeric tokens that align into a straight horizontal/vertical run (a
   dimension chain), and for each chain compares the *sum* of its labelled mm values to the *pixel span* the chain's
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
  so the estimate systematically *understates* the true span. That bias is small for a chain with few, large segments
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
  independent chains), not a single trusted reading.
- **The door-width cross-check failed outright on both test drawings and should be considered a dead end as
  currently implemented, not a promising lead.** Detected door icon bounding boxes came out only 4–20px wide, where
  a real ~800mm door at the true scale should measure roughly 60px — implausibly small on every match, on both
  images. This was tried two ways: first reading the icon-class argmax the way `ocr_flood_fill_smoothed.py`'s
  `_sink_icons` reads sinks (produced near-single-pixel noise), then switching to the model's proper heatmap-based
  polygon extractor (`polygons_from_predictions`, the same path the abandoned `analyse`/`debug_get_polygons`
  endpoints use) — which fixed nothing, ruling out "wrong extraction method" as the cause. The doors themselves *are*
  reliably mm-labelled directly on these drawings (confirmed by eye on multiple real drawings, e.g. door swings
  individually labelled 720/820/920/1200mm) so the idea is sound; the blocker is that this model's door/icon
  detection itself appears to produce implausible geometry at the native resolution production runs at — the same
  resolution-mismatch suspect as the room-merging failures found in `catalog_segmentation_failures.py`. Worth
  isolating and confirming (e.g. visualizing raw door detections in isolation) before investing further here, rather
  than assuming the cross-check idea itself is the problem.
- **A separate, higher-reliability opportunity was found but not prototyped here**: several of the real take-off
  PDFs turned out to be vector/CAD-exported, with an actual embedded text layer (extractable losslessly via
  `pymupdf`'s `get_text()`, no OCR involved) rather than being scanned raster images. The current pipeline discards
  this entirely — `apps/plaster-calculator-web/src/lib/pdf.ts` only rasterizes pages client-side via `pdfjs-dist`;
  it never reads the PDF's text layer. Where a text layer exists, extracting dimension strings (with exact position)
  from it client-side, before rasterization, would have zero OCR error — a fundamentally more reliable source than
  OCR-on-pixels for any drawing that has one. Not every drawing will (flattened/scanned pages won't), so this would
  be a "prefer text layer, fall back to OCR" design, not a full replacement.

Run: `../../venv/bin/python3 estimate_scale_from_drawing.py --image <path> [--known-scale-mm-per-px 12.7]`

### `scan_drawing_notes_for_quoting_attributes.py` — quoting-relevant room attributes

Pattern-matches OCR text against three signal types found by manually inspecting real take-off drawings (floor
plans, section views, and construction-detail sheets): ceiling-height call-outs, cornice/no-cornice finish notes,
and wet-area standard references. Deliberately simple regex/keyword matching, not a trained model — the point is to
test *whether the signal is extractable at all* from a 200 DPI rasterized page via the OCR infrastructure already in
production, not to ship a production parser.

**Findings:**

- **All three signal types were confirmed present on real drawings and successfully extracted by this script**,
  each on a different real drawing/page:
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
  broader discovery report) track a distinct "square set" line item specifically because those rooms get *no*
  cornice. So the concrete gap for cornice is not "detect a quantity" (done) but "detect which rooms/edges should be
  *excluded*" — exactly the square-set/shadowline signal this script already demonstrates it can find in a
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
room-detection experiments here found that naively downscaling made results *worse*, not better, so the fix is
unlikely to be as simple as "resize before inference" — but the resolution mismatch itself remains a plausible
common root cause worth investigating directly (e.g. fine-tuning, or a smarter multi-crop/tiling approach that
doesn't lose small-room wall detail) before either failure mode is treated as fully independent.
