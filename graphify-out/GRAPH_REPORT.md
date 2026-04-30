# Graph Report - .  (2026-04-30)

## Corpus Check
- 40 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 5743 nodes · 12443 edges · 67 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `pdf.worker.js` - 801 edges
2. `pdf.js` - 272 edges
3. `libraries.js` - 191 edges
4. `contact.min.js` - 190 edges
5. `index.min.js` - 190 edges
6. `simple.min.js` - 190 edges
7. `viewer.js` - 181 edges
8. `ConfigNamespace` - 141 edges
9. `TemplateNamespace` - 115 edges
10. `CanvasGraphics` - 92 edges

## Surprising Connections (you probably didn't know these)
- `executeOpTree()` --calls--> `setFillRGBColor()`  [EXTRACTED]
  D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.js → D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.js  _Bridges community 3 → community 4_
- `getXfaFontWidths()` --calls--> `getXfaFontName()`  [EXTRACTED]
  D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.worker.js → D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.worker.js  _Bridges community 1 → community 0_
- `parseExpression()` --calls--> `parseIndex()`  [EXTRACTED]
  D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.worker.js → D:\Kailash\st-patricks\wcc\assets\pdf-viewer\build\pdf.worker.js  _Bridges community 0 → community 15_

## Communities

### Community 0 - "Community 0"
Cohesion: 0
Nodes (501): pdf.worker.js, A, AbortException, Acrobat, Acrobat7, ADBE_JSConsole, ADBE_JSDebugger, addHTML() (+493 more)

### Community 1 - "Community 1"
Cohesion: 0.01
Nodes (104): addChildren(), adjustMapping(), AESBaseCipher, Annotation, AnnotationBorderStyle, AnnotationFactory, BasePdfManager, Border (+96 more)

### Community 2 - "Community 2"
Cohesion: 0.01
Nodes (132): viewer.js, abort(), AnnotationEditorLayerBuilder, AnnotationEditorParams, AnnotationLayerBuilder, AppOptions, AutomationEventBus, backtrackBeforeAllVisibleElements() (+124 more)

### Community 3 - "Community 3"
Cohesion: 0.01
Nodes (203): pdf.js, AbortException, addFontStyle(), AnnotationElementFactory, AnnotationLayer, appendText(), applyBoundingBox(), assert() (+195 more)

### Community 4 - "Community 4"
Cohesion: 0.01
Nodes (30): AnnotationEditor, AnnotationEditorLayer, AnnotationEditorUIManager, AnnotationElement, AnnotationStorage, BaseRangeReader, BaseSVGFactory, bindEvents() (+22 more)

### Community 5 - "Community 5"
Cohesion: 0.02
Nodes (38): Ascii85Stream, AsciiHexStream, BaseStream, CFFFont, CipherTransform, DecodeStream, decrypt(), decryptAscii() (+30 more)

### Community 6 - "Community 6"
Cohesion: 0.03
Nodes (151): contact.min.js, a(), advance(), ae(), ai(), applyScaleEffect(), ar(), At() (+143 more)

### Community 7 - "Community 7"
Cohesion: 0.03
Nodes (151): index.min.js, a(), advance(), ae(), ai(), applyScaleEffect(), ar(), At() (+143 more)

### Community 8 - "Community 8"
Cohesion: 0.03
Nodes (150): simple.min.js, a(), advance(), ae(), ai(), applyScaleEffect(), ar(), At() (+142 more)

### Community 9 - "Community 9"
Cohesion: 0.03
Nodes (157): libraries.js, A(), Aa(), ab(), advance(), ae(), Animation(), _assertThisInitialized() (+149 more)

### Community 10 - "Community 10"
Cohesion: 0.02
Nodes (11): parseUrl(), PDFDataRangeTransport, PDFDataTransportStream, PDFDataTransportStreamRangeReader, PDFDocumentProxy, PDFFetchStream, PDFNetworkStream, PDFNodeStream (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.01
Nodes (1): ConfigNamespace

### Community 12 - "Community 12"
Cohesion: 0.02
Nodes (2): TemplateNamespace, XFAFactory

### Community 13 - "Community 13"
Cohesion: 0.02
Nodes (34): applyAssist(), Arc, Area, ariaLabel(), Br, Button, Caption, CheckButton (+26 more)

### Community 14 - "Community 14"
Cohesion: 0.03
Nodes (13): BehaviorOverride, Binder, CCITTFaxDecoder, CCITTFaxStream, checkStyle(), createText(), Exclude, Packets (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.05
Nodes (13): BaseLocalCache, CFFCompiler, CFFDict, CFFFDSelect, CFFOffsetTracker, CFFParser, CFFPrivateDict, CFFStrings (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.04
Nodes (27): choices.min.js, ae(), Be(), ce(), condition(), de(), e(), fe() (+19 more)

### Community 17 - "Community 17"
Cohesion: 0.06
Nodes (40): swiper.min.js, a(), applyScaleEffect(), b(), c(), ce(), d(), de() (+32 more)

### Community 18 - "Community 18"
Cohesion: 0.04
Nodes (28): main.js, animateMenuText(), closeMenu(), getMenuDirection(), goToSlide(), initAboutReveal(), initFooterGradientFade(), initHeaderAnimations() (+20 more)

### Community 19 - "Community 19"
Cohesion: 0.08
Nodes (21): pdf.sandbox.js, a(), B(), ba(), d(), fa(), G(), I() (+13 more)

### Community 20 - "Community 20"
Cohesion: 0.07
Nodes (7): DatasetReader, DatasetXMLParser, isWhiteSpace(), isWhitespaceString(), SimpleXMLParser, XFAParser, XMLParserBase

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (8): AlternateCS, decodeAndClamp(), DefaultAppearanceEvaluator, DeviceRgbCS, IndexedCS, PDFImage, resizeImageMask(), resizeRgbImage()

### Community 22 - "Community 22"
Cohesion: 0.07
Nodes (8): BooleanElement, DateElement, DateTime, Decimal, Float, Integer, Time, valueToHtml()

### Community 23 - "Community 23"
Cohesion: 0.07
Nodes (2): CMap, IdentityCMap

### Community 24 - "Community 24"
Cohesion: 0.08
Nodes (7): AstArgument, AstBinaryOperation, AstLiteral, AstMin, AstVariable, AstVariableDefinition, ExpressionBuilderVisitor

### Community 25 - "Community 25"
Cohesion: 0.08
Nodes (1): LocaleSetNamespace

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (7): B, FontSelector, I, layoutNode(), layoutText(), P, TextMeasure

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (16): venobox.min.js, be(), ce(), de(), ee(), G(), ie(), J() (+8 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (3): PDFWorkerStream, PDFWorkerStreamRangeReader, PDFWorkerStreamReader

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (3): Color, Stipple, Util

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (1): XhtmlNamespace

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (1): ConnectionSetNamespace

### Community 32 - "Community 32"
Cohesion: 0.21
Nodes (2): ColorConverters, makeColorComp()

### Community 33 - "Community 33"
Cohesion: 0.18
Nodes (1): Word64

### Community 34 - "Community 34"
Cohesion: 0.36
Nodes (1): JpegImage

### Community 35 - "Community 35"
Cohesion: 0.25
Nodes (1): XFAAttribute

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (1): Text

### Community 37 - "Community 37"
Cohesion: 0.38
Nodes (1): StructTreeLayerBuilder

### Community 38 - "Community 38"
Cohesion: 0.53
Nodes (2): FeatureTest, shadow()

### Community 39 - "Community 39"
Cohesion: 0.4
Nodes (1): WorkerTask

### Community 40 - "Community 40"
Cohesion: 1
Nodes (1): animations.js

### Community 41 - "Community 41"
Cohesion: 1
Nodes (1): search-data.js

### Community 42 - "Community 42"
Cohesion: 1
Nodes (1): Gruntfile.js

### Community 43 - "Community 43"
Cohesion: 1
Nodes (1): debugger.js

### Community 44 - "Community 44"
Cohesion: 1
Nodes (1): college-life.php

### Community 45 - "Community 45"
Cohesion: 1
Nodes (1): contact.php

### Community 46 - "Community 46"
Cohesion: 1
Nodes (1): enrol.php

### Community 47 - "Community 47"
Cohesion: 1
Nodes (1): favicon.php

### Community 48 - "Community 48"
Cohesion: 1
Nodes (1): fonts.php

### Community 49 - "Community 49"
Cohesion: 1
Nodes (1): footer.php

### Community 50 - "Community 50"
Cohesion: 1
Nodes (1): header.php

### Community 51 - "Community 51"
Cohesion: 1
Nodes (1): index.php

### Community 52 - "Community 52"
Cohesion: 1
Nodes (1): internal-page-blocks-1.php

### Community 53 - "Community 53"
Cohesion: 1
Nodes (1): internal-page-blocks-2.php

### Community 54 - "Community 54"
Cohesion: 1
Nodes (1): modal.php

### Community 55 - "Community 55"
Cohesion: 1
Nodes (1): preloader.php

### Community 56 - "Community 56"
Cohesion: 1
Nodes (1): rough-extra-blocks.php

### Community 57 - "Community 57"
Cohesion: 1
Nodes (1): rough-internal-page.php

### Community 58 - "Community 58"
Cohesion: 1
Nodes (1): banner-mix.php

### Community 59 - "Community 59"
Cohesion: 1
Nodes (1): big-card.php

### Community 60 - "Community 60"
Cohesion: 1
Nodes (1): hero--secondary.php

### Community 61 - "Community 61"
Cohesion: 1
Nodes (1): hero--third.php

### Community 62 - "Community 62"
Cohesion: 1
Nodes (1): nav-row.php

### Community 63 - "Community 63"
Cohesion: 1
Nodes (1): simple-card--in-grid.php

### Community 64 - "Community 64"
Cohesion: 1
Nodes (1): simple-card--in-slider.php

### Community 65 - "Community 65"
Cohesion: 1
Nodes (1): teaching-and-learning.php

### Community 66 - "Community 66"
Cohesion: 1
Nodes (1): who-we-are.php

## Knowledge Gaps
- **28 isolated node(s):** `animations.js`, `search-data.js`, `Gruntfile.js`, `PixelsPerInch`, `debugger.js` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 40`** (2 nodes): `animations.js`, `animateItem()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `search-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Gruntfile.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `debugger.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `college-life.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `contact.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `enrol.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `favicon.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `fonts.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `footer.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `header.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `index.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `internal-page-blocks-1.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `internal-page-blocks-2.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `modal.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `preloader.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `rough-extra-blocks.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `rough-internal-page.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `banner-mix.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `big-card.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `hero--secondary.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `hero--third.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `nav-row.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `simple-card--in-grid.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `simple-card--in-slider.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `teaching-and-learning.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `who-we-are.php`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf.worker.js` connect `Community 0` to `Community 39`, `Community 1`, `Community 38`, `Community 29`, `Community 20`, `Community 5`, `Community 21`, `Community 23`, `Community 14`, `Community 34`, `Community 15`, `Community 24`, `Community 33`, `Community 12`, `Community 35`, `Community 13`, `Community 22`, `Community 36`, `Community 26`, `Community 11`, `Community 31`, `Community 25`, `Community 30`, `Community 28`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `pdf.js` connect `Community 3` to `Community 4`, `Community 10`, `Community 32`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `ConfigNamespace` connect `Community 11` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `animations.js`, `search-data.js`, `Gruntfile.js` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._