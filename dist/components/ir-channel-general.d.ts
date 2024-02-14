import type { Components, JSX } from "../types/components";

interface IrChannelGeneral extends Components.IrChannelGeneral, HTMLElement {}
export const IrChannelGeneral: {
  prototype: IrChannelGeneral;
  new (): IrChannelGeneral;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
