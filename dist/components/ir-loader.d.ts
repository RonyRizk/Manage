import type { Components, JSX } from "../types/components";

interface IrLoader extends Components.IrLoader, HTMLElement {}
export const IrLoader: {
  prototype: IrLoader;
  new (): IrLoader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
