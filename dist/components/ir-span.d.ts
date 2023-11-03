import type { Components, JSX } from "../types/components";

interface IrSpan extends Components.IrSpan, HTMLElement {}
export const IrSpan: {
  prototype: IrSpan;
  new (): IrSpan;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
