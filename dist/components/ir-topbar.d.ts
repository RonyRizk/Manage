import type { Components, JSX } from "../types/components";

interface IrTopbar extends Components.IrTopbar, HTMLElement {}
export const IrTopbar: {
  prototype: IrTopbar;
  new (): IrTopbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
