# Graph Report - .  (2026-04-24)

## Corpus Check
- 3 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 78 nodes · 146 edges · 12 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `main.js` - 42 edges
2. `GSAPAnimations` - 33 edges
3. `openMenu()` - 6 edges
4. `isMobile()` - 5 edges
5. `updateMenuForKey()` - 5 edges
6. `goToSlide()` - 4 edges
7. `updateNavState()` - 3 edges
8. `animateMenuText()` - 2 edges
9. `getMenuDirection()` - 2 edges
10. `setMenuImage()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `openMenu()` --calls--> `updateMenuForKey()`  [EXTRACTED]
  D:\Kailash\st-patricks\src\scripts\main.js → D:\Kailash\st-patricks\src\scripts\main.js  _Bridges community 6 → community 8_
- `openMenu()` --calls--> `isMobile()`  [EXTRACTED]
  D:\Kailash\st-patricks\src\scripts\main.js → D:\Kailash\st-patricks\src\scripts\main.js  _Bridges community 6 → community 7_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (1): main.js

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (2): animations.js, GSAPAnimations

### Community 2 - "Community 2"
Cohesion: 0.27
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (5): goToSlide(), initLatestNewsHeroSlider(), nextSlide(), prevSlide(), updateNavState()

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (4): animateMenuText(), openMenu(), setActiveMenuItem(), setSearchOverlayVisibility()

### Community 7 - "Community 7"
Cohesion: 0.5
Nodes (4): closeMenu(), initFooterGradientFade(), initMobileMenu(), isMobile()

### Community 8 - "Community 8"
Cohesion: 0.5
Nodes (4): getMenuDirection(), setActiveSubGroup(), setMenuImage(), updateMenuForKey()

### Community 9 - "Community 9"
Cohesion: 1
Nodes (2): initAboutReveal(), wrapWords()

### Community 10 - "Community 10"
Cohesion: 1
Nodes (2): initSearch(), liveSearch()

### Community 11 - "Community 11"
Cohesion: 1
Nodes (1): search-data.js

## Knowledge Gaps
- **2 isolated node(s):** `animations.js`, `search-data.js`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 9`** (2 nodes): `initAboutReveal()`, `wrapWords()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (2 nodes): `initSearch()`, `liveSearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `search-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main.js` connect `Community 0` to `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 4`, `Community 10`?**
  _High betweenness centrality (0.284) - this node is a cross-community bridge._
- **Why does `GSAPAnimations` connect `Community 1` to `Community 5`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `openMenu()` connect `Community 6` to `Community 0`, `Community 8`, `Community 7`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `animations.js`, `search-data.js` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._