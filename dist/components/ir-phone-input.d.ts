import type { Components, JSX } from "../types/components";

interface IrPhoneInput extends Components.IrPhoneInput, HTMLElement {}
export const IrPhoneInput: {
  prototype: IrPhoneInput;
  new (): IrPhoneInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
