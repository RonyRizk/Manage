import type { Components, JSX } from "../types/components";

interface IrBookingListing extends Components.IrBookingListing, HTMLElement {}
export const IrBookingListing: {
  prototype: IrBookingListing;
  new (): IrBookingListing;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
