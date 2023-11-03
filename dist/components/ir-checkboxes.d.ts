import type { Components, JSX } from "../types/components";

interface IrCheckboxes extends Components.IrCheckboxes, HTMLElement {}
export const IrCheckboxes: {
  prototype: IrCheckboxes;
  new (): IrCheckboxes;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
