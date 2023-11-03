import type { Components, JSX } from "../types/components";

interface IrSidebar extends Components.IrSidebar, HTMLElement {}
export const IrSidebar: {
  prototype: IrSidebar;
  new (): IrSidebar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
