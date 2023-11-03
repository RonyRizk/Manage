import type { Components, JSX } from "../types/components";

interface IrSelect extends Components.IrSelect, HTMLElement {}
export const IrSelect: {
  prototype: IrSelect;
  new (): IrSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
