import type { Components, JSX } from "../types/components";

interface IglBookingRooms extends Components.IglBookingRooms, HTMLElement {}
export const IglBookingRooms: {
  prototype: IglBookingRooms;
  new (): IglBookingRooms;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
