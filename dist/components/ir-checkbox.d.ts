import type { Components, JSX } from "../types/components";

interface IrCheckbox extends Components.IrCheckbox, HTMLElement {}
export const IrCheckbox: {
  prototype: IrCheckbox;
  new (): IrCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
