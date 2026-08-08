Theme style guide

Colors (CSS variables in `src/index.css`):
- --bg: outer window gray
- --surface: card background (white)
- --surface-strong: subtle violet-tinged surface for panels
- --text / --text-strong / --muted: typography colors
- --border: soft purple-tinted border
- --accent / --accent-strong: primary purple accent
- --teal / --pink: action accent colors

Spacing & radii:
- Base font-size: 15px
- Radii: --radius = 20px (outer), --radius-sm = 12px (cards)
- Typical paddings: panel 14-18px; controls 10-14px

Typography:
- Headings: h1=28px, h2=20px, h3=16px
- Font weights: --fw-regular (400), --fw-medium (600), --fw-strong (800)

Components (how to use):
- Dashboard panels: use `class="dashboard-panel"` for card background and shadow.
- KPI cards: `class="kpi-card"` with `.kpi-icon` to show an icon; values use `h3`.
- Right KPI boxes: use `RightKpis` component; left accent is applied inline with border-left.
- Buttons: use `primary-btn` (purple gradient) and `secondary-btn` (soft surface) classes.

Charts:
- Revenue charts use purple gradients and darker purple strokes; bar charts highlight the selected month with `#6133d9`.

Extending theme:
- Add tokens to `:root` in `src/index.css` and reference via `var(--token-name)`.

Examples

```css
.panel-example {
  background: var(--surface-strong);
  border-radius: 14px;
  padding: 16px;
}
```
