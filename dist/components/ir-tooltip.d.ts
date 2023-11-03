import type { Components, JSX } from "../types/components";

interface IrTooltip extends Components.IrTooltip, HTMLElement {}
export const IrTooltip: {
  prototype: IrTooltip;
  new (): IrTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
