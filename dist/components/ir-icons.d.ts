import type { Components, JSX } from "../types/components";

interface IrIcons extends Components.IrIcons, HTMLElement {}
export const IrIcons: {
  prototype: IrIcons;
  new (): IrIcons;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
