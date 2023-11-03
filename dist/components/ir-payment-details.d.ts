import type { Components, JSX } from "../types/components";

interface IrPaymentDetails extends Components.IrPaymentDetails, HTMLElement {}
export const IrPaymentDetails: {
  prototype: IrPaymentDetails;
  new (): IrPaymentDetails;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
