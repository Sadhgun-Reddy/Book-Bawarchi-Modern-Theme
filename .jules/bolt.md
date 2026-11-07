## 2024-03-22 - Memoize uiCaterers map in FindCaterers
**Learning:** `apiCaterers.map` in `FindCaterers.tsx` is being recalculated on every render. Because `mapToUICaterer` uses `Math.random()`, the values for rating, reviews, and distance will change unexpectedly and repeatedly whenever the component re-renders (e.g. when typing in the search input).
**Action:** Use `useMemo` to memoize `uiCaterers` mapping, preventing unnecessary recalculation and stabilizing the randomized mock data during re-renders.

## 2024-11-07 - Unmemoized Filtering in Lists
**Learning:** Found that several dashboard list components (like `MyEnquiries.tsx`) were performing array filtering (`Array.prototype.filter` with string manipulations like `.toLowerCase()`) and stats recalculation on every render instead of memoizing the results. When the `searchQuery` updates, it filters everything, but any other unrelated state update would also trigger these expensive calculations.
**Action:** Always wrap array filter/map operations and derived list data in `useMemo` in React components, especially when rendering lists or maps of complex objects, to avoid O(N) recalculations on unrelated component renders.
