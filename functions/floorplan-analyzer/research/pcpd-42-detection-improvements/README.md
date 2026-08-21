# PCPD-42 discovery research: floorplan detection improvements

Research code for [PCPD-42](https://inivi.atlassian.net/browse/PCPD-42) ("Improve floorplan room-detection accuracy
and extract more quoting-relevant detail"). Each script is a re-runnable prototype/harness for one of the ticket's
angles, plus the findings from actually running them against real floorplan images. The full discovery report (all
angles, prioritized recommendations) is a separate deliverable outside this repo; this README covers only what the
code here specifically found.

**No customer drawing content, file paths, or addresses appear in the text below or in the scripts** — findings are
described as patterns ("a chained dimension string", "a red ceiling-height callout"), not verbatim excerpts. Every
script takes `--image`/`--pdf` and was tested locally against real customer take-off drawings (rasterized at 200 DPI,
matching production) and against this repo's own `tmp/` sample images; none of that source image/PDF data is
committed here. The `screenshots/` directory **does** commit rendered overlay PNGs from those real drawings (see
below) — every one has had its address, client name, lot number, and permit/surveyor stamp blacked out before being
saved; only the floor plan geometry and generic drawing notes remain.

This research was done in four passes. **Everything under a "(fourth pass)", "(third pass)", or "(second pass)"
marker below corrects, extends, or supersedes framing from an earlier pass** — most importantly, the original
room-detection findings undersold how bad the room-merging problem actually is (see "Room boundary/geometry
detection"). Read markers in order; a later marker on the same point wins.

**Structure note (third pass):** the first two passes reported room-_label_ detection (can OCR/text-extraction find
a room's name) and room-_boundary_ detection (can flood-fill find a room's shape) under one combined "room-detection
accuracy" heading. They are genuinely different problems with different fixes, so this pass splits them into their
own sections below, plus two new dedicated sections: **Garage-specific failure** (a single, specific, now
5-for-5-reproduced failure mode, investigated on its own) and **General accuracy-improvement research** (approaches
to the segmentation model's overall accuracy, broader than any one failure mode). Nothing from the first two passes
was deleted in this restructuring — every finding below is still present, just filed under the section it actually
belongs to, with its original pass marked.

## Screenshots

`screenshots/` (committed, addresses/client names/permit numbers redacted with solid black boxes over the source
drawings' title blocks and identifying callouts — verify this holds if you add more).

**Redaction correction (fourth pass):** re-deriving every source page's identifying text and image bounding boxes
directly from the PDFs (rather than trusting the existing redaction) found two real gaps in already-committed
screenshots: the 729-Plimsoll surveyor-stamp redaction box was 80px shorter than the actual stamp image, leaving a
real company name and permit number visible in 14 files, and `09_door_window_schedule_8darter.png` had no
title-block redaction at all, exposing a real client name and street address. Both are fixed (see the redaction fix
commit); if you add new screenshots, don't assume an existing box set fully covers a new page — a drafting office's
stamp/title-block position can shift between sheets in the same drawing set, and a raster stamp image won't show up
in a text-layer search at all.

| File                                                                                                                                                                                      | Shows                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `00_source_drawing_729plimsoll_redacted.png`                                                                                                                                              | The real source drawing, unannotated, for reference against the overlays below                                                                                                                     |
| `01_room_merging_and_dropout_native_729plimsoll.png`                                                                                                                                      | Production's actual output at native resolution — the giant merged blob and the blank (undetected) garage, both visible directly                                                                   |
| `02a_downscaled_fit768_729plimsoll.png` / `02b_downscaled_fit1536_729plimsoll.png`                                                                                                        | Same drawing, resized before inference — visibly _fewer_ correctly-shaped rooms than native, not more                                                                                              |
| `03_multiscale_averaged_729plimsoll.png`                                                                                                                                                  | The multiscale-averaged variant — same merge failure, cleaner small-room fragments                                                                                                                 |
| `04a_sam_alternative_garage_success.png` / `04b_sam_alternative_meals_partial.png`                                                                                                        | SAM's point-prompted results on the same drawing                                                                                                                                                   |
| `05_room_merging_25taihu.png`                                                                                                                                                             | The same merge-and-garage-dropout pattern reproduced on a second, unrelated house                                                                                                                  |
| `06_numbered_room_failure_76scott.png`                                                                                                                                                    | The boarding house — nearly every room renders as unlabeled "Unknown"                                                                                                                              |
| `07_cornice_note_8darter.png`                                                                                                                                                             | A real "selected cornice to specification" construction note, the kind `scan_drawing_notes_for_quoting_attributes.py` extracts                                                                     |
| `08_ceiling_height_fcl_8darter.png`                                                                                                                                                       | A real section-view "FCL" ceiling-height annotation with its reduced-level dimension line                                                                                                          |
| `09_door_window_schedule_8darter.png`                                                                                                                                                     | A real door/window schedule sheet, showing exact per-door mm widths (the basis for the scale-detection door-width cross-check idea)                                                                |
| `10_font_signature_numbered_rooms_76scott.png`                                                                                                                                            | **(third pass)** Font-signature detection finding "Room 1".."Room 8" on the boarding-house drawing — the case a keyword list structurally cannot label                                             |
| `11_font_signature_rotated_labels_729plimsoll.png`                                                                                                                                        | **(third pass)** Keyword-matched training spans landing correctly on rotated "Kitchen"/"Entry"/"L'Dry"/"Ens" labels, positions intact despite rotation                                             |
| `12_font_signature_false_positives_76scott.png`                                                                                                                                           | **(third pass)** The honest downside of the same technique: this drafting office's title-block field labels ("SCALE:", "DRAWN:", etc.) share the room-label font too                               |
| `13_garage_leak_diagnostic_8darter.png`                                                                                                                                                   | **(third pass)** The Garage OCR seed's raw flood fill, unrejected — it consumes the entire page outside the building envelope                                                                      |
| `14_garage_icon_reinforced_result_729plimsoll.png`                                                                                                                                        | **(third pass)** Attempt 1's actual output: icon-aware wall reinforcement applied, then run through the real pipeline — Garage still blank, everything else unchanged                              |
| `15_garage_missing_door_icon_729plimsoll.png`                                                                                                                                             | **(third pass)** Why attempt 1 can't work: every detected door/window icon on the page (orange/blue rings) vs. the Garage seed (red) — nothing detected near the garage door                       |
| `16_garage_kernel_sweep_destroys_rooms_729plimsoll.png`                                                                                                                                   | **(third pass)** Attempt 2's actual output: a wall-closing kernel large enough to _approach_ bridging the garage door still doesn't find Garage, and has already destroyed nearly every other room |
| `17_garage_sam2_729plimsoll.png`                                                                                                                                                          | **(third pass)** Attempt 3's actual output: SAM2 (`sam2.1-hiera-base-plus`) point-prompted at the Garage seed — a real, comparable result to first-pass SAM1, same unsolved mask-selection problem |
| `18_tiling_vs_native_729plimsoll.png`                                                                                                                                                     | **(third pass)** Tiled/patch-based inference's actual output — comparable to native, doesn't independently fix the merge or dropout failures                                                       |
| `19_flip_ensemble_729plimsoll.png`                                                                                                                                                        | **(third pass)** Flip-based test-time-augmentation ensembling's actual output — same merge, same blank Garage, at ~4.5x the runtime                                                                |
| `20_multiplan_survey_76scott.png` / `21_multiplan_survey_729plimsoll.png` / `22_multiplan_survey_25taihu.png` / `23_multiplan_survey_37clarendon.png` / `24_multiplan_survey_8darter.png` | **(fourth pass)** `survey_labels_across_real_plans.py`'s overlay output for each of the 5 real houses — see "Multi-plan label survey" below                                                        |

---

## Room label detection

Can the room's **name** be found at all — regardless of whether its shape is found correctly? This is the OCR/text-
extraction problem, kept separate from "can flood-fill find the room's boundary" (see "Room boundary/geometry
detection", below) per this pass's restructuring — a room can be perfectly labeled and still come out the wrong
shape, or perfectly shaped and never get a name.

### The mechanism today, and its structural limit **(first pass)**

Production's only labeling mechanism (`ocr/service.py`'s `OcrService._match_keyword`, run from
`analysis/strategies/ocr_flood_fill_smoothed.py`) is a fixed substring match against `ocr/keywords.py`'s
`OCR_KEYWORDS` tuple (~70 English descriptive words: "kitchen", "bed", "ens", "garage", etc.). **Most severe result
in the first pass, and still the most severe single labeling result across all three: on the boarding-house/multi-
unit drawing, only 1 of 19 flood-filled regions got a real label (18 fell back to "Unknown")** — see
`screenshots/06_numbered_room_failure_76scott.png`. That drawing labels most rooms with generic numbering ("Room
1", "Room 2", ...) rather than descriptive English words, and generic numbers are not, and structurally cannot be,
in a fixed keyword list. This is not a resolution or model-accuracy problem at all — it is a **labeling-mechanism**
problem: the existing `_unknown_rooms_from_closed_regions` fallback already finds the _geometry_ of these rooms
correctly (19 regions found); it just never attempts a CNN-based room-type label for them the way the OCR-seeded
path does via `_get_room_type`. Wiring that in is a small, concrete, high-leverage fix, reusing exactly the
technique the abandoned `mask_rooms.py`/`segmap_rooms.py` strategies already implemented.

### OCR engine choice **(second pass)**

Installed and ran `paddleocr` (PP-OCRv6) side-by-side with the production `easyocr` engine (`compare_ocr_engines.py`)
on real failure cases, specifically the label-relevant ones:

- **Numbered-room drawing**: easyocr truncated two of the eight labels — reading bare `'ROOM'` with the digit
  silently dropped for "Room 1" and "Room 7" — while paddleocr read all eight correctly and found a ninth ("ROOM3")
  easyocr missed entirely. **Real, measured win for paddleocr** — but it does **not** fix the underlying problem:
  `"room"` is not a keyword in `ocr/keywords.py`, so even a perfectly-read "ROOM 3" still fails to seed a labeled
  room. Engine choice alone does not fix this failure mode; see the new font-signature idea below for one that does.
- **Punctuation-variant label noise** (the same "Ens." room label read as five different strings): **completely and
  cleanly fixed by paddleocr** — all five real instances of the same physical label came back as the identical
  string `'ENS.'` at 1.00 confidence every time, where easyocr had produced `ENS.`, `ENS,`, `ENS`, `ENS.` (different
  confidence), and `ENS_` for the same five rooms. Production's `_label_from_text` only special-cases a handful of
  exact strings, not punctuation-stripped ones, so this OCR noise becomes visible label noise today.

**Cost**: paddleocr is substantially slower — roughly 3–5x easyocr's wall-clock time per page in this environment
(e.g. 62.5s vs 12.8s on one dense drawing), plus a one-time model download on first use. A real latency/cost
trade-off, not a free upgrade — but the accuracy difference, especially the clean fix for punctuation-noise
duplicate labels, is large enough to be worth prototyping as a real follow-up, at least as an option.

Run: `../../venv/bin/python3 compare_ocr_engines.py --image <path> [--keyword kitchen] [--easyocr-rotation-info]`

### Rotated text **(second pass, re-verified third pass)**

Room labels are sometimes printed rotated 90° on these drawings — "Kitchen", "Entry", "Porch", "L'Dry", and "Ens"
among them on one real drawing. **Neither OCR engine, as configured in production, detects rotated text at all** —
verified directly: both `easyocr` and `paddleocr` find only unrelated horizontal _mentions_ of "kitchen"/"entry" in
regulatory note paragraphs elsewhere on the page, never the actual rotated room label. This is a concrete, verified
mechanism — not a hypothesis — for real room disappearances: no OCR seed is ever placed inside those rooms, so
`_rooms_from_seeds()` never attempts to flood-fill them.

- **easyocr with `rotation_info=[90, 180, 270]`**: does find the real rotated "Kitchen" (conf 0.73) and "Entry"
  (conf 1.00) labels, positions verified against the PDF text layer's independently-computed locations. A real,
  working, one-parameter fix — but **costs roughly 7.2x the OCR wall-clock time** (10.6s → 77.0s on one drawing).
- **PDF text layer**: content is trivially rotation-proof (it's encoded characters, not pixels), and _position_ was
  checked directly too, not assumed: `page.get_text("dict")`'s per-span `dir` vector correctly reports `(0.0, -1.0)`
  for genuinely rotated spans, and a rotated "Kitchen" span's bbox, converted to 200 DPI pixel space, predicted a
  center within 2px of where `easyocr`'s rotation-aware pass independently found the same word. (A naive first
  attempt used bounding-box aspect ratio as a rotation proxy and got misleading results — many short _horizontal_
  words are naturally taller than wide at normal font sizes. The `dir` vector is the correct signal; aspect ratio is
  not.) **Third pass re-verification**: the new font-signature script's training-set step (below) — which matches
  keywords against the PDF text layer, not OCR — recovered all six of this drawing's rotated room-name-keyword
  spans (Entry, Kitchen, Porch, L'Dry, two Ens instances) automatically, with zero rotation-specific handling
  required, simply because content matching against encoded text never had a rotation problem to begin with. This
  reconfirms the finding with a second, independently-built script, not just the original probe.

Run: `../../venv/bin/python3 compare_ocr_engines.py --image <path> --easyocr-rotation-info`

### PDF text-layer coverage **(second pass)**

`extract_dimensions_from_pdf_text_layer.py` (see also "Automatic scale detection" below) established that **of 85
total PDF pages across all 5 real take-off jobs available for this research, 75 (88%) have an embedded, extractable
text layer**, and the split is clean and bimodal: every multi-page "Architectural Drawings" CAD export (the actual
working-drawing sets with dimensions, room labels, and schedules) has **100%** text-layer coverage; every smaller
single-page derivative file (a flattened/exported summary page) has **0%**. In practice, text-layer-based label
detection (the font-signature idea below included) is close to universally applicable to the primary drawing content
these techniques target, but a fallback (OCR) is still required for roughly 1 in 8 pages in this sample.

### New: PDF text-layer + font-signature room-label detection **(third pass)**

A specific idea prototyped this pass, going beyond both OCR and plain PDF-text-layer keyword matching:
`detect_room_labels_by_font_signature.py`. **Hypothesis**: a drafting office's CAD template uses one consistent
font/size/style specifically for room-name callouts — visually distinct from dimension strings, general notes, and
title-block text — so once that signature is identified from a few known labels, every span sharing it is a very
likely room label, regardless of what the text actually says. That would catch labels a fixed keyword list
structurally cannot (numbered rooms, unusual names) and would be immune to rotation the way OCR isn't.

**Method implemented, exactly as specified**: (1) extract every text span from the PDF's own text layer via
`page.get_text("dict")`, keeping font family, size, flags (bold/italic/serif bits), and colour per span, plus
position; (2) use `ocr/keywords.py`'s `OCR_KEYWORDS` to find known room-label spans by content — a _training set_,
not the final detector; (3) group the training set by font signature `(font, size, flags, colour)` and rank
signatures by how many training spans share them; (4) re-scan every span on the page and keep every one matching a
signature, regardless of content; (5) report new finds and false positives, honestly, in both directions; (6) check
whether each match's own bbox-center position is usable as a flood-fill seed.

**First finding, before any real-drawing test: a single "most common signature" is too naive.** An initial version
picked only the single most-frequent training-set signature. Run against the boarding-house drawing (`--pdf ... --page
1`), the training set (21 keyword-matched spans) split across 7 distinct font signatures, and the single most common
one (8 training spans: "ENS 1".."ENS 8", the ensuite sub-labels) is a real, legitimate room-label font — but it is
_not_ the one "Room 1".."Room 8" are set in. That turned out to be the **second**-most-common cluster (5 training
spans: Kitchen/L'Dry/Entry/Living/Garage), which the naive top-1 rule silently discarded. **The fix**:
`detect_top_signatures` reports every signature with at least 2 training spans (top 3 by default), not just the
most frequent, so a page can legitimately have more than one room-label-ish font cluster and both get considered.

**Run against the boarding-house drawing (the numbered-room drawing referenced above, as specifically required) —
results reported honestly for every cluster, not just the best one:**

| Cluster (training count)                                     | New matches | What they are                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ArialMT` 5.5pt (8 spans: "Ens 1".."Ens 8")                  | 2           | Both **false positives** — "DRIVEWAY", "CONCRETE" (site-plan pavement notes sharing the small font)                                                                                                                                                                                                                               |
| `ArialMT` 6.5pt (5 spans: Kitchen/L'Dry/Entry/Living/Garage) | 25          | **8 are "Room 1" through "Room 8" — every one, the exact target.** 8 are bare "R" fragments (ambiguous, likely a per-room legend reference, harmless). 9 are **false positives**: title-block field labels ("PROJECT TITLE:", "DRAWN:", "SCALE:", "SHEET NUMBER:", etc.) share this exact font/size in this office's CAD template |
| `ArialNarrow` 7.0pt (2 spans: "Porch" x2)                    | 46          | Almost all **false positives** — site-survey annotations (fence heights, tree species, survey levels). A 2-span training set is too thin to trust; it picked up a generic "small note" style, not something room-label-specific                                                                                                   |

See `screenshots/10_font_signature_numbered_rooms_76scott.png` — a real, verified win: the font-signature approach
finds **all eight** numbered-room labels a fixed keyword list structurally cannot, on the exact drawing this pass
was asked to test against. It also has two distinct, real, characterizable false-positive patterns, shown honestly
rather than cropped out of the results:

- The same 5-training-span cluster that found the eight "Room N" labels **also** matched every field label in this
  drafting office's own title block — see `screenshots/12_font_signature_false_positives_76scott.png`: "PROJECT
  TITLE:", "PROJECT ADDRESS:", "SCALE:", "DATE:", "DRAWING:", "DRAWN:", "TYPE:", "SHEET NUMBER:", and "REVISION:"
  all got a ring too. This isn't a thin-training-set problem — 5 examples is a reasonable sample — it's that this
  CAD template genuinely reuses the same font/size for room names and title-block boilerplate. A production version
  would need to explicitly exclude a detected title-block region (title blocks sit in a predictable page
  location/strip) to filter this out.
- Separately, the thinly-trained 2-span cluster (`ArialNarrow` 7.0pt, "Porch" x2) produced 46 new matches that were
  almost all false positives (see the cluster table above) — a different problem, caused by too little training
  data rather than a font genuinely shared with non-room text, fixable by requiring a larger minimum training-set
  size before trusting a cluster.

### Follow-up: the title-block false positives were a rounding-granularity bug, not fundamental **(fourth pass)**

Direct visual inspection of `screenshots/12_font_signature_false_positives_76scott.png` raised a specific question:
the false-positive title-block text visually looks smaller than the genuine room labels in the same cluster — if
`font_signature()` compares size, why would two different sizes cluster together at all? Checking the actual
(unrounded) `span.size` values directly confirms the room labels ("ROOM 1".."ROOM 8", "GARAGE", "KITCHEN", "LIVING")
are set at **6.601pt**, while the title-block field labels ("SCALE:", "DRAWN:", etc.) are set at **6.276pt** — a
real, measurable ~4.9% difference, not the same size. They only collided into one cluster because
`font_signature()`'s size-rounding granularity (`SIZE_ROUND_PT`, previously a fixed 0.5) was coarse enough that both
values round to the same 6.5pt bucket.

**Fix, verified not assumed**: tightened the default rounding granularity from 0.5pt to 0.1pt (now a
`--size-round-pt` CLI flag, still overridable — see `detect_room_labels_by_font_signature.py`). Re-ran both existing
test drawings at the new default:

- 76 Scott: the room-label cluster's signature now separates cleanly into a `6.6pt` bucket (room labels + ambiguous
  "R" fragments only) and a distinct `6.3pt` bucket the title-block spans fall into instead — **all 9 false
  positives gone**, all 8 genuine hits and all 8 ambiguous fragments untouched (16 new matches in the room-label
  cluster, down from 25, with zero of the 9 removed matches being a real room label).
- 729 Plimsoll (the rotated-label drawing): re-ran the same rotated-label cluster at the new granularity —
  **byte-identical new-match list** to the 0.5pt baseline (same 10 new finds, same rotated flags). Confirms the
  tighter granularity doesn't fragment or lose anything on the one other real drawing this technique has been tested
  against.

This changes the false-positive framing from earlier in this section: the fix for _these_ false positives isn't a
title-block-region-exclusion heuristic (which would need to know the page's layout conventions) — it's simply
comparing font size at a realistic precision. A genuine same-size collision (a drafting office that sets its
title-block boilerplate in the _exact_ same rounded size as its room names, not just close) would still need a
title-block exclusion; neither real office tested here turned out to be that case.

**Run against the first drawing's rotated-label failure (Kitchen/Entry/Porch/L'Dry/Ens, all rotated 90°)**: the
dominant training cluster (18 spans, the largest and most reliable seen in either drawing) is populated by exactly
these labels already — see "Rotated text", above, for why: keyword-matching against PDF text-layer _content_ was
never rotation-sensitive to begin with, independent of the font-signature idea. Its 7 genuinely _new_ matches beyond
the training set (`D1`, `D2`, `D3` — door reference codes; `F/P` — fireplace; `AA` — a section-cut marker; `Double`,
`F` — OCR-visible fragments of "Double Garage") are real drawing annotations, not room names and not noise either —
a plausible, if modest, secondary use for this technique (door/window reference-code extraction). The two other
candidate clusters on this page (6 and 6 training spans respectively — general specification notes, and _red_
regulatory notes) are **100% false positives** in their new matches — notably, `colour` correctly separated the red
notes into their own cluster rather than mixing them with black room-label text, confirming colour is a genuinely
useful discriminating field even where that particular cluster wasn't useful. See
`screenshots/11_font_signature_rotated_labels_729plimsoll.png`.

**Seed-position usability, tested directly, not assumed**: converted each rotated label's PDF bbox-center to 200 DPI
pixel space and ran it through the actual production wall mask via the same raw-flood-fill helper used for the
Garage investigation (below):

| Label    | Touches border? | Area (px)       | What it means                                                                                                                                                                                                    |
| -------- | --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entry    | No              | 451,865         | Lands inside the pre-existing giant merged blob (see "Room boundary/geometry detection") — recovers the **label**, not a distinct shape                                                                          |
| Kitchen  | No              | 451,865         | Same merged blob as Entry                                                                                                                                                                                        |
| L'Dry    | No              | 31,003          | A clean, correctly-sized small region — closely matches (within 2%) one of the existing "Unknown" fallback shapes' own area (31,016px), i.e. the geometry was already found, this recovers its **correct label** |
| Ens (x2) | No              | 12,063 / 20,645 | Same pattern — closely match two more existing "Unknown" shapes (11,848px / 20,353px)                                                                                                                            |
| Porch    | **Yes**         | 6,662,272       | The **same catastrophic border leak documented for Garage** below — Porch shares the large-opening failure mode                                                                                                  |

This is a clean, concrete demonstration of exactly why this pass split label detection from boundary detection: for
this drawing, recovering the label fixes 3 of 6 rooms outright (L'Dry, both Ens — turns an unlabeled "Unknown" shape
into a correctly-named one), correctly finds a usable seed for 2 more that are geometrically fine but already
swallowed into a merge (Entry, Kitchen — still needs the boundary fix to actually show as separate rooms), and for
1 (Porch) hits an entirely different, boundary-side failure that label recovery cannot fix on its own.

Run: `../../venv/bin/python3 detect_room_labels_by_font_signature.py --pdf <path> --page <n> [--top-n-signatures 3] [--render-overlay <path>]`

### Multi-plan label survey **(fourth pass)**

Everything above was tested on one or two drawings at a time. `survey_labels_across_real_plans.py` runs the same,
unmodified `detect_room_labels_by_font_signature.py` detector (imported, not reimplemented) across all **five** real
houses used throughout this research, and emits one consolidated table — `label_survey.csv`, 792 rows — with every
detected label's text, source (keyword-matched training vs. font-signature-only new find), cluster rank, font
family/size/bold/italic, colour, pixel seed position, and rotation. Each house's actual floor-plan page was found
the same evidence-based way as the rest of this research: scan every page of every PDF in the house's folder for
`OCR_KEYWORDS` density, not guessed from filenames — this is how 729 Plimsoll's real page turned out to be page 10
of a third, differently-named `Architectural Drawings.pdf`, since the two street-address-named files in its folder
are both scanned/rasterized with no PDF text layer at all.

**The top-3 font-signature clusters per page are not all room-label clusters — reported honestly per cluster, not
lumped into one "detected labels" count:**

| House        | Cluster (font, size)                       | Training | New | What it actually is                                                                                                                       |
| ------------ | ------------------------------------------ | -------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 76 Scott     | `ArialMT` 6.6pt                            | 5        | 16  | **Room names** (see above) — 8 genuine, 8 ambiguous fragments                                                                             |
| 729 Plimsoll | `CIDFont+F1` 8.8pt                         | 18       | 10  | Door/window/fixture reference codes (D1–D3, F/P, AA) — not room names, but real, usable drawing annotations                               |
| 729 Plimsoll | `CIDFont+F1` 8.4pt                         | 6        | 4   | Area-schedule figures ("Dwelling – 198.00 m2", "Total Ground – 235.00 m2")                                                                |
| 729 Plimsoll | `CIDFont+F1` 8.8pt (distinct colour/flags) | 3        | 14  | Window reference codes (W1–W10)                                                                                                           |
| 25 Taihu     | `CIDFont+F1` 3.9pt                         | 11       | 103 | A **symbol/fixture legend table** ("SYMBOL", "DESCRIPTION", "ARTICULATION JOINT", "DOWNPIPE", "FIRE PLACE"…) — not room names, a schedule |
| 25 Taihu     | `CIDFont+F1` 4.5pt                         | 4        | 34  | A door/window schedule mixed with floor references ("D01", "W01", "GF")                                                                   |
| 37 Clarendon | `Swiss721BT-LightExtended` 7.9pt           | 34       | 16  | Plausible room/space names (COURTYARD, PWD) mixed with fixture labels (COATS)                                                             |
| 37 Clarendon | `Swiss721BT-LightExtended` 5.9pt           | 10       | 62  | Furniture/fixture callouts and door specs — see the Garage-relevant finding below                                                         |
| 37 Clarendon | `Calibri-Light` 8.4pt                      | 8        | 35  | General waterproofing/regulatory note text (AS4654 compliance boilerplate)                                                                |
| 8 Darter     | `ArialMT` 7.9pt                            | 36       | 205 | **A second, distinct false-positive pattern** — see below                                                                                 |
| 8 Darter     | `Arial-BoldMT` 9.9pt                       | 15       | 3   | **Room names** — clean, high-confidence (SITTING, B.I.R, WALKWAY)                                                                         |
| 8 Darter     | `ArialMT` 8.1pt                            | 4        | 56  | A utilities/services legend (GAS METER, METER BOX, TELSTRA BOX, HOT WATER SYSTEM)                                                         |

**Two new findings worth flagging on their own:**

- **8 Darter's dominant cluster is a dimension-number collision, not a title-block one.** Its 205 new "matches" are
  overwhelmingly bare dimension figures ("190", "5500", "3940", "6000") interleaved with genuine room names
  ("SITTING") — this drafting office's template sets dimension-string text in the _exact_ same font/size/style/colour
  as room names, not merely a close rounding-boundary collision like 76 Scott's. Confirmed this is a different root
  cause, not a repeat of the same rounding bug: the actual room names on this page cluster separately and cleanly at
  `Arial-BoldMT` 9.9pt (bold, distinct from the dimension text's plain `ArialMT` 7.9pt) — so the fix here isn't
  finer size-rounding, it's that `flags` (bold) already does the discriminating work correctly, provided the
  training set favours the bold cluster. This is exactly the scenario the earlier "requires a false-positive filter"
  caveat was anticipating, now seen for real on a second house with a different mechanism than the first.
- **37 Clarendon's secondary cluster includes the literal text "PANEL LIFT DOOR"** next to a "2800W x 2400H"
  dimension callout — a real, independent, _text-based_ signal for garage-style doors on at least one real drawing.
  This is directly relevant to the Garage-specific failure below: Attempt 1 there failed because the model's _icon_
  detector never recognises a garage door as a "Door" icon. A text-based detector reading the drawing's own door
  labels wouldn't have that problem — worth a follow-up spike specifically checking whether other real garage doors
  are labelled this explicitly, since this research's Garage sample (5 houses) didn't previously check for a text
  callout at the door location, only for an icon.

**What this does and doesn't establish**: this is a survey of what the technique returns, not a new accuracy claim
for room-label detection specifically — most of the "new" volume across these 5 houses is schedules, legends, and
reference codes, not missed room names (76 Scott and 8 Darter's bold cluster remain the only two clean room-name
wins in this sample). The useful result is the full attribute table (`label_survey.csv`) itself: position, rotation,
and font metadata for every detected span, real data a downstream flood-fill-seeding or schedule-extraction step
could consume directly, rather than a claim that font-signature clustering alone reliably separates "room name" from
"everything else" without also looking at what the training-set content itself suggests a cluster is.

Run: `../../venv/bin/python3 survey_labels_across_real_plans.py --out-dir <dir> [--top-n-signatures 3]`

### What's promising vs. not (room label detection)

| Idea                                                                                         | Verdict                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wire CNN-based room typing into the unlabeled-region fallback                                | **Cheapest fix available** — geometry already found for numbered/unusual-label rooms, only labeling is missing                                                                                                                                                                                             |
| PaddleOCR as an alternative engine                                                           | Real, measured accuracy win, especially on label-punctuation noise; real 3–5x speed cost                                                                                                                                                                                                                   |
| Rotation-aware OCR (`rotation_info`)                                                         | Real, working fix for rotated labels; real ~7x cost; strictly dominated by the text layer where available                                                                                                                                                                                                  |
| PDF text-layer keyword matching                                                              | Best foundation in this section — near-instant, rotation-immune for free, ~88% page coverage                                                                                                                                                                                                               |
| **Font-signature detection (new, third pass; false positives fixed fourth pass)**            | **Real, verified win on exactly the case it was built for** (all 8 numbered rooms) — the title-block collision was a rounding-granularity bug, now fixed (0.1pt default), verified with zero regression on the other test drawing; a thin-training-set minimum is still worth adding before production use |
| Bold (`flags`) as a discriminating field, across a 5-house survey **(fourth pass)**          | **Promising, seen for real on 8 Darter** — its bold room-name cluster is completely clean where its plain-weight cluster collides with dimension numbers; worth checking whether a training set can be told to prefer a bold cluster when one exists                                                       |
| Text-based door-type detection (e.g. "PANEL LIFT DOOR" callouts) **(fourth pass, untested)** | **New lead, not yet tried against the Garage failure** — sidesteps the icon-detector gap Attempt 1 hit; needs checking across more real garage doors before it's more than a one-house observation                                                                                                         |

---

## Room boundary/geometry detection

Can flood-fill find the room's correct **shape** — independent of whether it ends up with the right name? This is
the wall-mask/flood-fill accuracy problem.

### Corrected framing: a "labeled" room isn't necessarily a usable one **(second pass)**

The first pass reported counts like "7 labeled, 7 unknown, 14 total" and used the labeled count as a rough proxy for
usefulness. That undersold the real problem in a specific, important way: **the `label` field rendered in the
overlay/UI is only the first OCR seed that happened to land in a region.** When a wall-mask leak merges several real
rooms into one flood-filled blob, the other merged rooms' names land in a `merged_labels` list that is **not shown
anywhere in the UI** (`_render_floorplan()` draws only the primary `label`). So a room "labeled" only via
`merged_labels` is, from what a user actually sees, indistinguishable from a room that was never detected at all.

Doing a full manual accounting — every room on the real source drawing, cross-checked against both the rendered
overlay (`screenshots/01_room_merging_and_dropout_native_729plimsoll.png`) and the raw JSON's `merged_labels` field
— for a single-storey house with roughly 18 distinct room-instances on the drawing:

| Outcome                                                                     | Count    | Example rooms                                    |
| --------------------------------------------------------------------------- | -------- | ------------------------------------------------ |
| Own distinct, correctly-labeled polygon (genuinely usable)                  | ~6       | Bed 2, Bed 4, a robe/Bed-3 pair, both WIRs, Bath |
| Found as a shape, but unlabeled ("Unknown") — needs full manual re-labeling | ~7       | both ensuites, laundry, other small fragments    |
| Buried in another room's `merged_labels` — invisible in the UI, not usable  | ~4       | Family, Lounge, Master Bedroom, one robe         |
| **Completely absent — no seed, no fallback shape, no trace anywhere**       | **~3–4** | **Garage, Kitchen, Entry, Porch**                |

This was **not a one-off**: repeating the same audit on a second, unrelated house (`screenshots/05_room_merging_25taihu.png`,
different drafting office) found the identical pattern with the identical recurring room: Kitchen merges invisibly
into a giant open-plan blob (`merged_labels: ['Dining', 'Kitchen', 'Family', 'Linen 2']`). A third house
(`screenshots/06_numbered_room_failure_76scott.png`) shows the same Kitchen-into-merge pattern a third time. **Third
pass note**: Garage's total absence (as opposed to Kitchen's merge-and-hide) is common enough, and mechanistically
distinct enough, that it now has its own dedicated section below rather than being folded in here.

Something like a third to a half of a real house's rooms come out of the current pipeline unusable in one of these
ways — a meaningfully worse starting point than "7 of 14" implied.

### Wall-mask leaks and the merge failure **(first pass)**

`catalog_segmentation_failures.py` runs the _actual production strategy code_ (not a reimplementation), varying the
model's input resolution, against real houses of different typologies. **The single most damaging failure mode
found: wall-mask leaks silently merge multiple real rooms into one giant region.** On one test image, a flood-filled
region covering ~5.8% of the entire page merged what should have been three-plus separate rooms (confirmed via the
`merged_labels` field) — including at least one pair with a real dividing wall on the source drawing, so this is a
genuine wall-detection gap, not a correctly-merged open-plan area. This happened identically at every resolution
tested, including the multiscale average (below) — **resolution/TTA changes do not fix this failure mode.** Root
cause (why these specific internal walls are missed) is not yet isolated as of this pass.

**OCR-seed label noise**: on one drawing, the same room ("Ensuite") produced four different labels (`Ens,`, `Ens.`,
`Ens_`, `Ensuite`) because OCR read the same abbreviation with different trailing punctuation. Now with a measured
fix — see PaddleOCR, above, in "Room label detection" (this is a label-quality issue, not a boundary one, hence its
new location).

Run: `../../venv/bin/python3 catalog_segmentation_failures.py --image <path> --fit-longs 768,1024,1536 --multiscale`

### Resolution and multiscale experiments **(first pass)**

- **Downscaling before inference makes room-shape detection measurably worse, not better, on every image tested** —
  contradicting the intuitive fix suggested by the ~6–10x mismatch between production's native inference resolution
  (3300–4700px/side) and the model's ~256–512px training crops (per the abandoned `fit_scale.py`'s own docstring).
  Labeled-room count fell monotonically as resolution dropped (e.g. 7→2 rooms going from native to `fit_long=768`)
  — see `screenshots/02a_downscaled_fit768_729plimsoll.png` vs. `01_...native...png`, visibly _fewer_ correctly-
  shaped rooms at lower resolution. Small/thin walls between tightly-packed rooms blur away at lower resolution.
- **Multiscale-logit averaging** (native + several smaller scales, averaged before argmax — the abandoned
  `multiscale.py`'s idea, adapted to the current pipeline) matched native resolution's labeled-room recall while
  cutting spurious "unknown" fallback fragments roughly in half, at ~1.4x inference cost — see
  `screenshots/03_multiscale_averaged_729plimsoll.png`. A real but modest win; it did **not** fix the merge or
  Garage-dropout failures (identical blob shape at every resolution tested).

### New alternative: tiling/patch-based inference, and flip-based ensembling **(third pass — see "General accuracy-improvement research" below)**

Both were flagged as untried ideas in earlier passes and are now actually implemented and tested — full results are
under "General accuracy-improvement research" since they're general-purpose inference changes, not merge-specific
fixes, but the short version relevant here: **neither fixed the room-merging failure.** Both produced room-shape
results comparable to native resolution (not worse, unlike downscaling), with a similar modest reduction in spurious
"Unknown" fragments to what multiscale averaging already achieved — but the specific internal-wall gaps that cause
merging were present identically in every variant tested across all four approaches (native, multiscale, tiled,
flip-ensembled). This failure mode looks structural to the model's own wall-class confidence at these specific
walls, not an artifact of any one inference-time technique tried so far.

### Alternative segmentation approach: Segment Anything (SAM), for the merge case **(second pass)**

Installed `transformers` + `facebook/sam-vit-base` (~375MB) and ran it directly against a real drawing, prompted at
production's own real OCR seed coordinates. (See "Garage-specific failure" below for the Garage prompt result — this
subsection covers the merge-relevant prompt only.)

**Prompted at the "Meals" seed — the room at the center of the worst merge failure**: mixed, genuinely informative
result. SAM returns three candidate masks per prompt; neither the highest-IoU-score mask (a near-noise 1067px
sliver) nor the largest-area mask (itself an over-merge spanning more than half the house) was usable automatically.
The **middle** candidate, however — `screenshots/04b_sam_alternative_meals_partial.png` — is a genuinely good
result: a clean Kitchen+Meals+Family open-plan boundary that correctly stops before the bedroom wing, arguably
_more_ accurate than production's own merged blob (which incorrectly reaches all the way to a separate Lounge room).
**Automatic mask selection among SAM's multiple candidates is a real, unsolved problem** — picking "highest score"
or "largest area" both failed here; something smarter (e.g. cross-referencing the existing wall-mask CNN output, or
a plausible-room-area prior) would be needed before this is usable unattended. See "General accuracy-improvement
research" below for one concrete idea on what "smarter" could mean, informed by this pass's SAM2 mask-selection
result.

### What's promising vs. not (room boundary/geometry detection)

| Idea                                                | Verdict                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Downscale before inference                          | **Not promising** — measurably worse recall on every real image tried                                        |
| Multiscale logit averaging                          | Modest, real win on fallback-noise; doesn't fix the merge/dropout failures                                   |
| Tiling / flip-ensembling **(new, third pass)**      | Comparable to native (safe, unlike downscaling); doesn't independently fix the merge/dropout failures either |
| SAM point-prompted segmentation (Meals case)        | A real, verified win on one merge case, using an existing seed point; needs a mask-selection strategy        |
| Fix wall-mask leaks at real internal walls directly | Needed; root cause not yet isolated across three passes                                                      |

---

## Garage-specific failure

Its own section, per this pass's restructuring: Garage does not merge, does not fall back to "Unknown" — it is
**completely absent**, no trace anywhere in the output, and this reproduces with zero exceptions across every real
house with a garage tested so far.

### Root cause, re-verified directly this pass, not assumed **(first pass hypothesis, third pass verification)**

**Hypothesized in the first pass**: a garage's wide door opening leaves a gap in the model's wall mask; the OCR-
seeded flood fill escapes through that gap past the building envelope onto the blank page margin, touches the image
border, and is silently discarded by `_touches_border()`. This pass built `fix_garage_dropout.py`'s `diagnose` mode
specifically to check this directly rather than continue to assume it: flood-fill from the real "garage" OCR seed
**without** the border-touch rejection, and render where the fill actually goes.

**Ground truth established first**: ran the actual production pipeline against every real house used across all
three passes that has a garage, plus one not previously used in room-detection testing (37 Clarendon, a duplex, only
used in pass 2 for the PDF-text-layer-coverage statistic before now):

| House                                                  | OCR found "Garage" text?                                                   | Garage-related room in output?         |
| ------------------------------------------------------ | -------------------------------------------------------------------------- | -------------------------------------- |
| 729 Plimsoll                                           | Yes, twice, conf 0.78/0.93                                                 | **No — completely absent**             |
| 25 Taihu                                               | Only an incidental door note ("...GARAGE PEDESTRIAN DOOR"), conf 0.60      | **No — completely absent**             |
| 76 Scott (boarding house, detached garage)             | Yes, twice, conf 0.79/0.95                                                 | **No — completely absent**             |
| 8 Darter                                               | Yes, three times, conf 0.99+ (cleanest case: unambiguous, high-confidence) | **No — completely absent**             |
| 37 Clarendon (duplex, two garages) **(new this pass)** | Yes, multiple times, conf 0.99+, both units                                | **No — completely absent, both units** |

**5 for 5.** Garage vanishing entirely is not a one-off or even an occasional pattern — it is, so far, universal
across every real garage tested in this research.

**Direct leak verification, all 5 houses**: for every garage-related OCR seed found (11 seeds across the 5 houses),
flood-filling from it against the real production wall mask — with the border-touch rejection disabled just to see
where the fill goes — **touches the image border in every single case**, and the flooded area is enormous: 6.47–14.2
million px, on pages of 7.7–15.5 million px total — **84–92% of the entire page**, not a small leak past one wall.
See `screenshots/13_garage_leak_diagnostic_8darter.png` (the cleanest OCR case) — the flood fill consumes the whole
page outside the building envelope, while every properly-enclosed interior room (Dining, Kitchen, Sitting, all
bedrooms) stays correctly white/unfilled. This is a clean, surgical confirmation: the leak path is specifically from
Garage to the exterior margin, not sideways into neighbouring interior rooms. The root cause is verified, not
hypothesized, on every case available.

Run: `../../venv/bin/python3 fix_garage_dropout.py --image <path> --approach diagnose --out-dir <dir>`

### Attempt 1: reinforce the wall mask at detected door/window icon locations **(third pass — proposed in an earlier pass, actually tried now)**

The obvious-sounding fix: use the model's own icon detector to find the door, and draw it onto the wall mask as
solid (blocking) before closing + flood fill, since a door opening is exactly a "Door" icon detection. Implemented
in `fix_garage_dropout.py --approach icon_reinforced` (draws every detected door/window polygon, mapped back to
original-image coordinates, onto the wall mask before `_close_wall_mask`).

**Result: zero effect, on all 5 houses.** Room count, labeled count, and unknown-fallback count are bit-for-bit
identical before and after reinforcement in every case (e.g. 729 Plimsoll: 14/14 rooms both ways; 8 Darter: 13/13;
37 Clarendon: 21/21). `screenshots/14_garage_icon_reinforced_result_729plimsoll.png` is this attempt's actual
output run through the real pipeline, not just the metrics — Garage is still blank and the rest of the drawing is
pixel-for-pixel the same merge/dropout pattern as the untouched baseline.

**Diagnosed why, not just reported that it failed**: dumped every detected door/window icon's position on two of the
houses. 729 Plimsoll has 13 detected doors and 14 detected windows total on the page — **all clustered in the
bedroom wing, none within hundreds of pixels of the garage's actual door opening.** 8 Darter has 16 detected doors —
same pattern, closest one is still far from the garage's sectional door. See
`screenshots/15_garage_missing_door_icon_729plimsoll.png`: orange rings mark every detected door, blue rings every
detected window, the red crosshair marks the Garage OCR seed — visually, nothing is anywhere near it. **The model's
icon detector systematically does not recognize garage-style sectional/panel-lift doors as "Door" icons at all** —
not a positioning error, a detection gap, plausibly because CubiCasa5k's training distribution (Finnish residential
floor plans) doesn't include this door style. Icon-reinforcement cannot work when there is no icon to reinforce
with; this is a second, independent root-cause layer beyond the wall-mask gap itself.

Run: `../../venv/bin/python3 fix_garage_dropout.py --image <path> --approach icon_reinforced --out-dir <dir>`

### Attempt 2: classical-CV morphological closing **(third pass)**

The lever production already exposes: `_close_wall_mask`'s `wall_kernel_size` (default 15px). Swept
`fix_garage_dropout.py --approach kernel_sweep` from 15 up to 251px (~17x default) on 729 Plimsoll:

| Kernel size   | 15 (baseline) | 31  | 51  | 75  | 101 | 151 | 201 | 251    |
| ------------- | ------------- | --- | --- | --- | --- | --- | --- | ------ |
| Total rooms   | 14            | 13  | 16  | 19  | 14  | 8   | 5   | 2      |
| Garage found? | No            | No  | No  | No  | No  | No  | No  | **No** |

**Garage is never found, at any tested size — and by kernel≈150–250, the closing operation has already destroyed
most of the rest of the house**, collapsing 14 real rooms down to 2 giant blobs and turning large stretches of the
page margin solid "wall". See `screenshots/16_garage_kernel_sweep_destroys_rooms_729plimsoll.png` (kernel=251): only
two surviving room shapes (an over-merged "Master" blob and an over-merged "Meals" blob), Garage still blank, and
the entire margin now rendered as wall texture instead of open space.

**This isn't just an unlucky test range — the math rules it out.** These drawings' garage door openings measure
4200–4800mm (documented directly on the drawings: "4800mm Wide x 2400mm High Panel Lift Door", "SECTIONAL GARAGE
DOOR 2400H x 4200W"). At this research's independently-derived scale (~12.7mm/px at 200 DPI, 1:100), that's roughly
330–380px wide. A symmetric morphological closing kernel needs to be roughly as large as the gap it's meant to
bridge — so a working kernel size would need to be **larger than the already-catastrophic 251px tested**, not
smaller. This approach is ruled out with a concrete, quantitative reason, not just an empirical shrug.

Run: `../../venv/bin/python3 fix_garage_dropout.py --image <path> --approach kernel_sweep --kernel-sizes 15,31,51,75,101,151,201,251 --out-dir <dir>`

### Attempt 3: an alternative model — SAM2 **(third pass)**

First pass's SAM (`facebook/sam-vit-base`) already produced a clean, accurate garage segmentation from a single
point prompt (see `screenshots/04a_sam_alternative_garage_success.png`, unchanged finding, re-confirmed as a data
point). This pass adds a genuinely newer model: **SAM2**, via `transformers`' native `Sam2Model`/`Sam2Processor`
(already available in the installed `transformers==5.15.1`, no separate package needed; checkpoints auto-download
from HuggingFace). New script: `try_sam_point_prompt.py --model {sam,sam2}`.

- **`facebook/sam2.1-hiera-tiny`** (31.4M params, loads in ~5s): prompted at the same 729 Plimsoll garage seed —
  mask quality was noticeably worse than SAM1's result, leaking slightly past the top-left building edge into the
  street margin. Fast (0.34s inference).
- **`facebook/sam2.1-hiera-base-plus`** (73.3M params, loads in ~35s first run): a much better result — a clean,
  well-contained garage outline (see `screenshots/17_garage_sam2_729plimsoll.png`), comparable to or slightly better
  contained than SAM1's. Fast enough (0.71s inference) to still be practical.
- **The mask-selection problem — already flagged as unsolved for SAM1 in pass 2 — is, if anything, worse for SAM2 on
  this domain, not better.** SAM2 also returns 3 candidate masks with confidence scores; on both checkpoints tested,
  the visually-correct, well-contained garage mask scored **lowest** of the three (0.009–0.011), while two tiny
  noise-sliver masks scored **highest** (0.7–0.8+). SAM1's problem was "highest score isn't obviously right"; SAM2's
  is "highest score is confidently, specifically wrong." A newer model is not automatically an easier integration
  path for this specific blocker.

Run: `../../venv/bin/python3 try_sam_point_prompt.py --image <path> --x <seed_x> --y <seed_y> --model sam2 --out-dir <dir>`

### Bonus finding: Porch shares the same failure

Not scoped as part of this section's remit but discovered while testing font-signature seed positions (see "Room
label detection", above): a "Porch" label's seed position also produces a raw flood fill that touches the border
with a 6.66M-px leak — mechanistically identical to Garage. Large/open exterior spaces in general are at risk here,
not specifically or only garages — worth keeping in mind when scoping a fix (a garage-specific patch would miss
Porch; a general "large opening" fix would catch both).

### What's promising vs. not (Garage-specific failure)

| Approach                                                                                              | Verdict                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Icon-aware wall-mask reinforcement                                                                    | **Ruled out** — the model doesn't detect garage-style doors as icons at all, so there's nothing to reinforce with                               |
| Larger closing kernel (classical CV)                                                                  | **Ruled out**, with a concrete quantitative reason — the needed kernel size (330–380px+) would destroy the rest of the house first              |
| SAM (point-prompted, standalone)                                                                      | Works well as a standalone segmentation, both checkpoint families; **not integrated into production**, mask-selection unsolved                  |
| SAM2 (point-prompted, standalone) **(new)**                                                           | Comparable-to-better raw quality with a big-enough checkpoint; **mask-selection is worse-calibrated than SAM1**, not an easier integration path |
| A smarter mask-selection heuristic (untested this pass — see "General accuracy-improvement research") | **The actual remaining blocker** for shipping either SAM family — not the segmentation quality itself                                           |

---

## General accuracy-improvement research

Broader than any one failure mode: approaches to the segmentation model's overall accuracy. Two were flagged as
untried ideas in earlier passes and are actually implemented and tested this pass; one (fine-tuning) is scoped with
concrete specifics rather than run, since it genuinely needs more than this pass's time/compute; SAM2 is covered
above under "Garage-specific failure" and cross-referenced here as the "newer foundation model" angle.

### Tiling / patch-based inference **(third pass, new)**

The idea flagged as untried in earlier passes: keep the model closer to its ~256–512px training crop size, without
losing fine wall/small-room detail the way whole-page downscaling does (see "Room boundary/geometry detection",
above). `tile_based_inference.py` splits the full-resolution image into overlapping tiles (default 512px, 128px
overlap), runs inference on each tile independently (each tile only needs a `round32` pad, not a resize, so it sees
genuinely native-resolution pixels), accumulates every tile's raw logits into a full-page canvas (averaged across
overlaps to avoid hard seams), then runs the exact same wall-mask/flood-fill pipeline production uses.

| House        | Native (rooms/labeled/unknown, time) | Tiled 512px/128px overlap (rooms/labeled/unknown, time) |
| ------------ | ------------------------------------ | ------------------------------------------------------- |
| 729 Plimsoll | 14 / 7 / 7 (3.13s)                   | 13 / 7 / 6 (6.17s, 54 tiles in a 9x6 grid)              |
| 25 Taihu     | 16 / 14 / 2 (3.10s)                  | 15 / 13 / 2 (6.38s)                                     |

See `screenshots/18_tiling_vs_native_729plimsoll.png` for the actual rendered output behind the 729 Plimsoll row.

**Comparable to native — labeled-room recall matches, no visible tile-seam artifacts, a similar modest reduction in
spurious "Unknown" fragments to what multiscale averaging already achieved. Garage is still not found either way**,
which is expected and mechanistically consistent: tiling only changes the segmentation step, not the flood-fill/
border-rejection step where the Garage failure actually happens (see "Garage-specific failure" above) — a tiled wall
mask still has the exact same "outside the building is one giant open region" problem once flood fill runs on it.
**Verdict: safe (unlike downscaling), a real but modest win on fallback noise, not a fix for either serious failure
mode on its own, at roughly 2x native's inference cost** (stitching many small tiles vs. one large forward pass).

Run: `../../venv/bin/python3 tile_based_inference.py --image <path> --tile-size 512 --overlap 128 --out-dir <dir>`

### Ensembling: flip-based test-time augmentation **(third pass, new)**

A different kind of ensembling than multiscale (same orientation, several resolutions) or tiling (same resolution,
several crops): `ensemble_flip_tta.py` runs the model on the native image plus horizontally-flipped, vertically-
flipped, and 180°-rotated copies, un-flips each output back to the original orientation, and averages the logits —
on the theory that a floor plan has no "up is up" prior, so a real wall's wall-class confidence should be
orientation-independent, while orientation-dependent noise should average out.

| House        | Native (rooms/labeled/unknown, time) | 4-way flip ensemble (rooms/labeled/unknown, time)          |
| ------------ | ------------------------------------ | ---------------------------------------------------------- |
| 729 Plimsoll | 14 / 7 / 7 (3.13s)                   | 13 / 7 / 6 (14.07s)                                        |
| 25 Taihu     | 16 / 14 / 2 (3.10s)                  | **16 / 14 / 2 (13.15s) — bit-for-bit identical to native** |

See `screenshots/19_flip_ensemble_729plimsoll.png` for the actual rendered output behind the 729 Plimsoll row above
— visually indistinguishable from native's own overlay: same giant Meals/Family/Lounge merge, same blank Garage.

**Verdict: a real technique, correctly implemented (un-flip-then-average), but negligible measured benefit on these
two houses** — one showed the same small fallback-noise reduction tiling/multiscale already demonstrated, the other
showed zero change at all — **at roughly 4.5x native's inference cost for 4-way**. Not worth its cost as tested; if
revisited, a cheaper 2-way (native + one flip) might be worth checking before writing this off entirely, but the
signal so far doesn't suggest a fundamentally different ceiling than the other ensembling variants already tried.

Run: `../../venv/bin/python3 ensemble_flip_tta.py --image <path> --flips h,v,hv --out-dir <dir>`

### Newer segmentation foundation model: SAM2 **(third pass, new)**

Full results under "Garage-specific failure" above (installed, run, and evaluated on the concrete failure case this
research already has ground truth for). Summary for the general-accuracy question: **SAM2 is reasonably installable
today** (the `transformers==5.15.1` already in this environment supports it natively; checkpoints auto-download; no
extra dependency needed beyond what SAM1 already required) and **fast enough to be practical** (sub-second inference
per prompt after a one-time load). It does **not** demonstrate a clear accuracy edge over SAM1 on this domain with a
comparably-sized checkpoint, and its own mask-confidence calibration is, if anything, less trustworthy for automatic
selection than SAM1's already-flagged problem. **Concrete next step this points to, not previously written down**:
a real mask-selection heuristic — e.g., score each of SAM's/SAM2's 3 candidate masks by IoU overlap with the
existing CNN's own wall-mask-derived room region at the same seed, rather than trusting either "highest confidence"
or "largest area" — would directly convert the "produces good masks but can't pick automatically" finding (now
confirmed on two model families) into something shippable.

### Fine-tuning feasibility **(third pass, scoped not run)**

Not run this pass — genuinely out of scope for a research spike (no training data, no multi-hour GPU budget here) —
but scoped with concrete specifics grounded in what this pass actually found in the codebase, not a vague pointer:

- **Model size**: `hg_furukawa_original` (the production hourglass CNN, `floortrans/models/hg_furukawa_original.py`)
  has **17.4M parameters** — confirmed by loading it and summing `model.parameters()`. This is a small model by
  current standards; fine-tuning compute itself would be modest (plausibly a few GPU-hours on a single consumer or
  cloud GPU for a transfer-learning-style fine-tune from the existing checkpoint, not a multi-day training run) —
  compute is _not_ the bottleneck.
- **Annotation format required**: confirmed directly from `floortrans/loaders/svg_loader.py`'s `FloorplanSVG`
  dataset class — each training sample needs `F1_scaled.png` (the rendered floor plan), `F1_original.png`, and
  `model.svg` (a **vector SVG annotation** of every room polygon, wall line, and icon, per-class, parsed by the
  `House` class into the segmentation/heatmap labels the model trains against). This is CubiCasa5k's own schema —
  real Melbourne take-off drawings have **no existing annotations in this format**, so fine-tuning on them means
  producing new SVG-format ground truth, not just applying labels to existing images.
- **What that would actually take**: either a custom annotation tool built to emit this exact SVG schema, or an
  adaptation of an existing open-source polygon-annotation tool (e.g. CVAT, `labelme`) with a schema-conversion
  step from its own export format to CubiCasa5k's. For the annotation _volume_: no measurement exists for how many
  real drawings would meaningfully shift accuracy on this specific drawing style (Australian/Melbourne conventions,
  the specific failure modes documented in this research), but as an informed order-of-magnitude estimate rather
  than a number pulled from nowhere — enough to cover the range of drafting-office conventions already seen to vary
  across just 5 real jobs in this research (rotated labels, numbered rooms, differing OCR keyword coverage, garage
  door styles) — a low hundreds of fully-annotated real drawings (roughly 100–300) is a more realistic starting
  point than a handful, given how much per-office variation this research alone already surfaced.
- **Bottom line**: the blocker is annotation tooling and labor, not compute or model size. Worth a dedicated,
  separately-scoped spike specifically on building or adapting an annotation pipeline, before any actual fine-tuning
  attempt — flagged here as promising-but-genuinely-too-large-for-this-pass, with the specifics above rather than a
  bare "fine-tuning could help" pointer.

### What's promising vs. not (general accuracy-improvement research)

| Idea                                        | Verdict                                                                                                                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tiling / patch-based inference              | **Tested, safe, modest win** on fallback noise; not a fix for merge/dropout on its own; ~2x cost                                                                                                |
| Flip-based ensembling (TTA)                 | **Tested, real technique, negligible measured benefit** on these two houses; ~4.5x cost for 4-way                                                                                               |
| SAM2 as a newer foundation model            | **Installable and fast today**; no clear accuracy edge over SAM1 here; mask-selection is the real blocker, confirmed on two model families now                                                  |
| A CNN-informed SAM mask-selection heuristic | **Most promising concrete next step in this section** — directly addresses the one blocker shared by both SAM and SAM2 findings; not yet built                                                  |
| Fine-tuning on annotated real drawings      | **Plausible, correctly scoped, not run** — compute is cheap given the model's small size; annotation tooling/labor is the real cost, roughly 100–300 real drawings as a starting-point estimate |

---

## Automatic scale detection

Two independent scale-estimation methods, both on infrastructure the repo already has (`easyocr` via
`ocr/service.py`, and the segmentation model's own icon channels), so neither needs a new model or a new dependency.
(Unchanged in scope by this pass's restructuring — this angle was never blended with room-detection accuracy the
way the old "Angle 1" was.)

### `estimate_scale_from_drawing.py` — dimension-chain OCR and door-width cross-check **(first pass)**

1. **Dimension-chain OCR**: clusters OCR'd numeric tokens that align into a straight horizontal/vertical run (a
   dimension chain), and for each chain compares the _sum_ of its labelled mm values to the _pixel span_ the chain's
   text covers.
2. **Door-width cross-check**: matches the model's detected door icon polygons to nearby standalone OCR numbers in a
   plausible door-width range, using label_mm / door_pixel_width per matched door.

**Validation method**: for a 200 DPI render of an A3 (420×297mm) architectural sheet stated as drawn at "1:100", the
ground-truth scale is derivable independently: `25.4mm/inch ÷ 200dpi × 100 (plot scale) = 12.7mm/px`. Both methods
were scored against this derived ground truth on two different real drawings.

- **Dimension-chain OCR is directionally correct and usable as a rough cross-check, not yet precise enough to trust
  outright: -5.5% error on one drawing, -28.5% on another.** The error has a clear, mechanistic explanation: the
  script approximates a chain's pixel span using its OCR text bounding boxes' outer edges, but dimension text sits
  inset from the actual tick marks it labels, understating the true span — worse for chains with many small filler
  segments. **The single most accurate individual chain on both test drawings was the coarsest one available**
  (fewest tokens, largest average segment) — one came out at -2.6% error. "Prefer the coarsest chain" is a concrete
  next step.
- **OCR reliability on real dimension strings**: most clean 2–4 digit numbers read at 90–100% confidence, but
  space-separated-thousands values (e.g. "1 550") occasionally get truncated — the leading digit silently dropped.
  **Measured, and two different fixes for this specific problem now exist** — see PaddleOCR and PDF-text-layer
  results, below.
- **The door-width cross-check failed outright on both test drawings — a dead end as currently implemented.**
  Detected door icon bounding boxes came out only 4–20px wide, where a real ~800mm door at true scale should measure
  roughly 60px. Tried two extraction methods with the same result, ruling out "wrong extraction method" as the
  cause; the blocker is the model's own door/icon detection producing implausible geometry at native resolution —
  the same resolution-mismatch suspect behind the room-merging failures (see "Room boundary/geometry detection").
  **Third-pass connection**: this is a different manifestation of the same icon-detection unreliability confirmed
  directly in "Garage-specific failure" above (the model failing to detect garage-style doors as icons at all) —
  both findings now point at the icon detector's real-world reliability as a shared, unresolved weak point.

Run: `../../venv/bin/python3 estimate_scale_from_drawing.py --image <path> [--known-scale-mm-per-px 12.7]`

### PaddleOCR for dimension reading **(second pass)**

The dimension-relevant half of the PaddleOCR comparison (see "Room label detection" above for the label-relevant
half): confirmed as a real, repeated easyocr failure across a full page — `'810'` vs paddleocr's correct `'8810'`,
`'650'` vs `'3 650'`, `'470'` vs `'6 470'`, `'960'` vs `'1 960'` (twice), several bare `'000'` reads with leading
digits dropped entirely. Not perfectly one-sided (one value favoured easyocr), but overwhelmingly one-directional
across dozens of instances. Paddleocr also found substantially more dimension tokens overall on the same page,
consistent with easyocr additionally struggling with rotated/vertical dimension chains (see "Rotated text" above).
Same cost caveat as the label case: ~3–5x easyocr's wall-clock time.

### PDF text-layer extraction for dimensions **(second pass)**

`extract_dimensions_from_pdf_text_layer.py` — the first pass flagged this as "high-confidence" without running it;
this pass built it and ran a genuine three-way comparison (text layer vs. easyocr vs. paddleocr) on real pages. See
"Room label detection" above for the coverage statistic (88% of pages, 100% of primary architectural drawing sets) —
same underlying infrastructure, this script's specific angle is dimension values:

- **On values both methods can read, the text layer is exact where OCR is approximate**: extraction takes under 1ms
  per page (no model, no inference) versus multiple seconds for either OCR engine, and every dimension value it
  returns matches the drawing exactly, with zero digit-truncation risk.
- **Rotation is where the text layer's advantage is largest in practice**: the only one of the three methods that
  finds rotated dimension chains at both zero extra engineering cost and effectively zero extra runtime cost.
- **Still not a full OCR replacement**: ~12% of pages have no text layer (scanned/flattened files) and need OCR
  regardless; even a vector page could carry a raster annotation (a scanned stamp, a hand markup) needing OCR.

Run: `../../venv/bin/python3 extract_dimensions_from_pdf_text_layer.py --pdf <path> --page <n> [--compare-ocr]`

### What's promising vs. not (automatic scale detection)

| Idea                                              | Verdict                                                                                                                           |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Dimension-chain OCR as a rough cross-check        | **Promising**, with a known fix path (prefer coarse chains / detect tick marks via CV)                                            |
| PaddleOCR as an alternative engine for dimensions | Real, measured accuracy win; real 3–5x speed cost                                                                                 |
| PDF text-layer extraction                         | **Best-evidenced idea in this section** — near-instant, zero-error, handles rotation for free, ~88% coverage                      |
| Rotation-aware OCR (`rotation_info`)              | Real, working fallback for the ~12% of pages without a text layer; real ~7x cost                                                  |
| Door-width cross-check                            | **Not promising as implemented** — blocked upstream on icon-detection quality, now doubly confirmed (see Garage-specific failure) |

### Next-step recommendations (scale detection)

1. **Prototype client-side PDF text-layer extraction** (`pdfjs-dist` exposes an equivalent text-content API) as the
   primary dimension/rotation-safe source, falling back to OCR (with `rotation_info` enabled) only for the ~12% of
   pages with no text layer.
2. **Evaluate PaddleOCR as the OCR fallback engine**, weighed against its real latency cost — most justified for the
   fallback path specifically, since the text layer already covers the common case.
3. **Refine dimension-chain scale estimation** (prefer coarse chains; detect tick marks via CV) as a cross-check
   layered on top of (1), not instead of it.
4. **Ship any auto-detected scale as a suggested, user-confirmed value**, not a silent override.
5. **Don't invest further in the door-width cross-check** until the icon detector's reliability is addressed
   directly (see "Garage-specific failure" and "General accuracy-improvement research" above).

---

## Quoting-relevant room attributes

_(Unchanged from the first two passes — this angle was never blended with room-detection accuracy, so this pass's
restructuring doesn't touch it. The take-off spreadsheet analysis, drawing inspection, and schema-gap findings below
were already hands-on and visually grounded and hold as originally reported.)_

`scan_drawing_notes_for_quoting_attributes.py` pattern-matches OCR text against three signal types found by manually
inspecting real take-off drawings: ceiling-height call-outs, cornice/no-cornice finish notes, and wet-area standard
references. Deliberately simple regex/keyword matching, not a trained model — the point is to test _whether the
signal is extractable at all_ via the OCR infrastructure already in production, not to ship a production parser.

### Findings

- **All three signal types were confirmed present on real drawings and successfully extracted**, each on a different
  real drawing/page (see `screenshots/07_cornice_note_8darter.png` and `screenshots/08_ceiling_height_fcl_8darter.png`
  for two of the three, actually rendered):
    - A ceiling-height call-out written directly on a floor plan (a value in mm next to the word "ceiling") —
      matched at 0.92 OCR confidence, but only via the script's windowed multi-detection join, since OCR split the
      number and the word "Ceiling" into two separate text boxes.
    - A section-view ceiling-height annotation using the "FCL" abbreviation next to a metres value — also matched at
      0.92 confidence, cross-checked by hand against the section's own reduced-level figures (exact agreement).
    - A cornice construction note ("Selected cornice to specification") — read as a single OCR box at 0.75–0.77
      confidence, no windowing needed.
- **A raked-ceiling legend note was visually confirmed present but not caught by this script** — it only
  pattern-matches raked-ceiling/cornice keywords against single OCR detections, not the windowed join used for
  ceiling-height. Extending windowing to every category is a one-line-per-category fix.
- **These findings connect directly to existing, mostly-unused schema**: `AreaPolygon.ceilingHeightMm` and
  `FloorplanPage.ceilingHeightMm` already exist, there is already a `ceilingMode: "flat" | "raked"` field with a
  full `RakedCeiling` shape, and there is already a readiness check + fix-control UI nudging the user to enter
  ceiling height by hand (`ceiling-height-set.resolver.ts`, `ceiling-height-fix-control.component.tsx`). None of
  this needs a schema change — the gap is entirely that these fields can only be filled in by hand today.
- **Cornice length is already auto-computed** (`corniceLengthQuantity()`) but with **no way to exclude a room** —
  the concrete gap is detecting which rooms/edges should be _excluded_ (square-set/no-cornice), not computing a
  quantity, which this script already demonstrates it can find in a construction-detail note.
- **The existing wet-area default has a specific, confirmed coverage gap**: `defaultWallBoardTypeForRoom` only
  special-cases room type `"Bath"`, while `ocr/keywords.py` already produces distinct `"Toilet"` and `"Laundry"`
  room types — both unambiguously wet areas — that get standard (non-water-resistant) board by default. Same-day
  fix in `analyzer.ts` alone.

### What a real Melbourne estimator's take-off actually records

Five real customer take-off spreadsheets were opened and their structure analyzed. All five share an identical
structure:

- **The real unit of measurement is not "room" — it's wall run, grouped by (board thickness × edge/finish profile ×
  wall height).** The app's room-polygon model is a superset of this — room polygons plus per-edge board type and
  height can be rolled up into exactly this kind of report automatically.
- **Every single job had multiple distinct wall/ceiling height bands** — commonly 2–4 per house. Not an edge case,
  normal in every sample — the strongest, most universal evidence for prioritizing automatic ceiling-height
  detection.
- **A separate "water-resistant ceiling" line, always present but small** — confirms wet-area ceiling board is
  already a distinct, tracked line item in real practice.
- **A "square set" style row appeared in one job**, meaning (per AU industry terminology) a room finished with no
  cornice at all.
- **The manual "Cornice" line-item cell was present in every spreadsheet's template but left unfilled (zero) in all
  five real jobs sampled** — this doesn't strongly support "auto-detecting cornice quantity is the top priority."

### AU/Melbourne industry context

Villaboard (already referenced in the codebase) is the de facto standard AU wet-area substrate, governed by **AS
3740** — confirmed twice (web research, and found printed directly on real drawings' wet-area notes). AS/NZS 2589
governs general gypsum lining. Cove cornice (55/75/90mm) is the traditional finish; Square Set (no cornice) is a
real, named, increasingly common alternative. Quoting conventions (walls/ceilings by m², cornice by lineal metre)
match both the spreadsheet structure and the app's existing quantity sources.

### What the drawings themselves actually show

Ceiling height is directly annotated two ways (inline floor-plan callouts and section-view "FCL" annotations).
Raked/vaulted ceiling zones are explicitly marked with both a hatch pattern and a text note. Cornice construction
notes appear directly in construction-detail sheets. Doors are individually labelled with exact leaf widths in mm,
and some drawings carry a full door/window schedule — see `screenshots/09_door_window_schedule_8darter.png`.
Obscured/frosted glazing is marked on window schedules — a plausible additional wet-area signal, not deeply
prototyped, flagged as a follow-up idea.

### What's promising vs. not (quoting-relevant room attributes)

| Idea                                               | Verdict                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Auto-detect ceiling height                         | **Highest-value, best-evidenced idea in this entire research effort**                            |
| Detect square-set/no-cornice rooms                 | **Promising and cheap** — signal is extractable, plugs a real hole in shipped cornice math       |
| Extend wet-area board defaulting to Toilet/Laundry | **Trivial, high-confidence win**, no detection needed                                            |
| Auto-detect cornice _quantity_                     | **Lower priority than it first appears** — already computed; weak spreadsheet evidence of demand |
| Obscured-glazing-as-wet-area-signal                | Plausible, not prototyped                                                                        |

### Next-step recommendations (quoting-relevant attributes)

1. **Ship ceiling-height auto-detection from drawing OCR**, pre-filling the existing `ceilingHeightMm` field.
2. **Extend wet-area board defaulting to cover `"Toilet"` and `"Laundry"`** — immediate correctness fix.
3. **Confirm the RE/SE vs. "square set" terminology question with the business**, then prototype detecting
   square-set/no-cornice notes and excluding those rooms from `corniceLengthQuantity()`.
4. **Do not prioritize cornice-quantity auto-detection.**

---

## Cross-cutting observations

- **Label detection and boundary detection are genuinely separable problems, confirmed concretely this pass**: the
  font-signature seed-usability test (see "Room label detection") showed the same technique landing on 6 rotated
  labels with 3 different outcomes — 2 recovered only a label inside an already-merged blob (boundary problem
  untouched), 2 recovered both a correct label _and_ correct geometry (a real fix), and 1 hit the Garage/Porch-style
  border-leak failure outright (an entirely different, boundary-side problem). Any given "missing room" needs
  diagnosing on both axes independently, not treated as one undifferentiated failure.
- Room-merging (boundary detection) and the door-width cross-check (scale detection) both trace to the same
  native-resolution-vs-training-resolution mismatch and/or icon-detector unreliability. Naive downscaling, tiling,
  and flip-ensembling were all tested this round and none fixed the underlying wall/icon-confidence issues at the
  specific locations that matter — the fix is unlikely to be any single inference-time trick, and increasingly looks
  like it needs either targeted post-processing at known-weak locations (garage-style door openings specifically) or
  genuine fine-tuning (scoped, not run, see "General accuracy-improvement research").
- **The Garage failure is now the single most thoroughly-verified finding across all three passes**: root cause
  confirmed directly (not assumed) on 5/5 real houses, three different fix approaches tried and each ruled out or
  left unintegrated for a specific, evidenced reason, and a concrete next step (CNN-informed SAM mask selection)
  identified from the pattern across both SAM and SAM2 results.
- Rotated text is a cross-cutting gap that independently explains real room disappearances (label detection),
  the door-width cross-check's resolution-mismatch suspect (scale detection), and is where the PDF-text-layer
  approach's advantage is largest across both angles it touches — one underlying issue (pixel-based OCR never
  handling rotation) shows up as multiple symptoms, and the PDF text layer (and the font-signature technique built
  on top of it) sidesteps all of them at once, for free, wherever a text layer exists.
