import type { Components, JSX } from "../types/components";

interface IrCombobox extends Components.IrCombobox, HTMLElement {}
export const IrCombobox: {
  prototype: IrCombobox;
  new (): IrCombobox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
