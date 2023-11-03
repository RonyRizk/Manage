import type { Components, JSX } from "../types/components";

interface IrIcon extends Components.IrIcon, HTMLElement {}
export const IrIcon: {
  prototype: IrIcon;
  new (): IrIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
