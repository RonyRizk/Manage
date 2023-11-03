import type { Components, JSX } from "../types/components";

interface IrSwitch extends Components.IrSwitch, HTMLElement {}
export const IrSwitch: {
  prototype: IrSwitch;
  new (): IrSwitch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
