import type { Components, JSX } from "../types/components";

interface IrToast extends Components.IrToast, HTMLElement {}
export const IrToast: {
  prototype: IrToast;
  new (): IrToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
