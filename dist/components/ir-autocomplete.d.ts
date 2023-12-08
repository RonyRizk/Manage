import type { Components, JSX } from "../types/components";

interface IrAutocomplete extends Components.IrAutocomplete, HTMLElement {}
export const IrAutocomplete: {
  prototype: IrAutocomplete;
  new (): IrAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
