import type { Components, JSX } from "../types/components";

interface IrChannelMapping extends Components.IrChannelMapping, HTMLElement {}
export const IrChannelMapping: {
  prototype: IrChannelMapping;
  new (): IrChannelMapping;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
