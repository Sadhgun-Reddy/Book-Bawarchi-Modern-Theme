## 2024-03-22 - Memoize uiCaterers map in FindCaterers
**Learning:** `apiCaterers.map` in `FindCaterers.tsx` is being recalculated on every render. Because `mapToUICaterer` uses `Math.random()`, the values for rating, reviews, and distance will change unexpectedly and repeatedly whenever the component re-renders (e.g. when typing in the search input).
**Action:** Use `useMemo` to memoize `uiCaterers` mapping, preventing unnecessary recalculation and stabilizing the randomized mock data during re-renders.
