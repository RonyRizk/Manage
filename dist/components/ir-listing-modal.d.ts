import type { Components, JSX } from "../types/components";

interface IrListingModal extends Components.IrListingModal, HTMLElement {}
export const IrListingModal: {
  prototype: IrListingModal;
  new (): IrListingModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
