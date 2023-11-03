import type { Components, JSX } from "../types/components";

interface IrBookingDetails extends Components.IrBookingDetails, HTMLElement {}
export const IrBookingDetails: {
  prototype: IrBookingDetails;
  new (): IrBookingDetails;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
