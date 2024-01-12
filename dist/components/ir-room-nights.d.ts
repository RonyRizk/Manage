import type { Components, JSX } from "../types/components";

interface IrRoomNights extends Components.IrRoomNights, HTMLElement {}
export const IrRoomNights: {
  prototype: IrRoomNights;
  new (): IrRoomNights;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
