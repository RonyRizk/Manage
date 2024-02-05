import type { Components, JSX } from "../types/components";

interface IrPickup extends Components.IrPickup, HTMLElement {}
export const IrPickup: {
  prototype: IrPickup;
  new (): IrPickup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
