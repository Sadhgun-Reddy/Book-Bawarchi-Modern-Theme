## 2024-03-20 - ARIA Labels for Mobile Menus

**Learning:** Icon-only buttons used for critical navigation elements like mobile menus need proper ARIA attributes to be accessible. Just `aria-label` isn't enough; they also need `aria-expanded` and `aria-controls` to communicate their state and relationship to the screen reader.
**Action:** When creating or reviewing mobile menus or collapsible sections, ensure the toggle button has `aria-expanded` mapped to its state, an `aria-controls` attribute pointing to the ID of the collapsible container, and a clear, dynamic `aria-label` (e.g., "Open menu" / "Close menu").

## 2026-11-05 - [TagInput Accessibility and Focus States]

**Learning:** Found that custom tagging components built with list loops often map structural label associations poorly (`htmlFor` mapping to proper `<input id>`) and lack button type specs on sub-elements leading to unintended form submissions. Also, inline elements frequently lack visible keyboard focus styling, especially icon buttons.
**Action:** Always check custom compound form controls (like Tag Inputs) for proper label-to-input association using `React.useId()`. Ensure all inner action buttons explicitly declare `type="button"`, possess an `aria-label`, and use `focus-visible` ring utilities to ensure keyboard users have visual context and prevent accidental form submissions.
