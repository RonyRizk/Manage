import type { Components, JSX } from "../types/components";

interface OtaLabel extends Components.OtaLabel, HTMLElement {}
export const OtaLabel: {
  prototype: OtaLabel;
  new (): OtaLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
