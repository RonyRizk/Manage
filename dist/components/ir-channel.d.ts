import type { Components, JSX } from "../types/components";

interface IrChannel extends Components.IrChannel, HTMLElement {}
export const IrChannel: {
  prototype: IrChannel;
  new (): IrChannel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
