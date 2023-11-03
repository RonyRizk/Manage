import type { Components, JSX } from "../types/components";

interface IrGuestInfo extends Components.IrGuestInfo, HTMLElement {}
export const IrGuestInfo: {
  prototype: IrGuestInfo;
  new (): IrGuestInfo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
