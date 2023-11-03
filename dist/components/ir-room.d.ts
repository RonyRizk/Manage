import type { Components, JSX } from "../types/components";

interface IrRoom extends Components.IrRoom, HTMLElement {}
export const IrRoom: {
  prototype: IrRoom;
  new (): IrRoom;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
