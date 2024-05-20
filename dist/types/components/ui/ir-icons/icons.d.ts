declare const icons: Record<string, {
  d: string;
  viewBox: string;
}>;
export type TIcons = keyof typeof icons;
export default icons;
