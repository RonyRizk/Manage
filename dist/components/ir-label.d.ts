import type { Components, JSX } from "../types/components";

interface IrLabel extends Components.IrLabel, HTMLElement {}
export const IrLabel: {
  prototype: IrLabel;
  new (): IrLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
