import type { Components, JSX } from "../types/components";

interface IrChannelManager extends Components.IrChannelManager, HTMLElement {}
export const IrChannelManager: {
  prototype: IrChannelManager;
  new (): IrChannelManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
