import type { Components, JSX } from "../types/components";

interface IrDropdown extends Components.IrDropdown, HTMLElement {}
export const IrDropdown: {
  prototype: IrDropdown;
  new (): IrDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
