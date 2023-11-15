import type { Components, JSX } from "../types/components";

interface IrLoadingScreen extends Components.IrLoadingScreen, HTMLElement {}
export const IrLoadingScreen: {
  prototype: IrLoadingScreen;
  new (): IrLoadingScreen;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
