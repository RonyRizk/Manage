import type { Components, JSX } from "../types/components";

interface IrDatePicker extends Components.IrDatePicker, HTMLElement {}
export const IrDatePicker: {
  prototype: IrDatePicker;
  new (): IrDatePicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
