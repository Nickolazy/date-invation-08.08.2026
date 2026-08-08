/**
 * Raw color values for JS-driven animation (Motion can't interpolate
 * CSS custom properties). Keep in sync with the `@theme` block in
 * src/index.css — that file is the source of truth for the palette.
 */
export const colors = {
  ivory: "#f7f0e8",
  surface: "#fffcf8",
  rose: "#c68e93",
  roseMist: "#efdcd8",
  burgundy: "#6b2731",
  burgundyDark: "#481b22",
  ink: "#2a2220",
  stone: "#726459",
  line: "#e4dcd3",
} as const;
