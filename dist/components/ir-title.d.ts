import type { Components, JSX } from "../types/components";

interface IrTitle extends Components.IrTitle, HTMLElement {}
export const IrTitle: {
  prototype: IrTitle;
  new (): IrTitle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
