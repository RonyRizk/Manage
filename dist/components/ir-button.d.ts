import type { Components, JSX } from "../types/components";

interface IrButton extends Components.IrButton, HTMLElement {}
export const IrButton: {
  prototype: IrButton;
  new (): IrButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
