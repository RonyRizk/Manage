import type { Components, JSX } from "../types/components";

interface IrListingHeader extends Components.IrListingHeader, HTMLElement {}
export const IrListingHeader: {
  prototype: IrListingHeader;
  new (): IrListingHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
