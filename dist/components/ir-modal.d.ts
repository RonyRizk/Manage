import type { Components, JSX } from "../types/components";

interface IrModal extends Components.IrModal, HTMLElement {}
export const IrModal: {
  prototype: IrModal;
  new (): IrModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
