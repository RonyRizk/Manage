import type { Components, JSX } from "../types/components";

interface IrMapping extends Components.IrMapping, HTMLElement {}
export const IrMapping: {
  prototype: IrMapping;
  new (): IrMapping;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
