import type { Components, JSX } from "../types/components";

interface IrPopover extends Components.IrPopover, HTMLElement {}
export const IrPopover: {
  prototype: IrPopover;
  new (): IrPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
