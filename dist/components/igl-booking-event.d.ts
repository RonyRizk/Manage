import type { Components, JSX } from "../types/components";

interface IglBookingEvent extends Components.IglBookingEvent, HTMLElement {}
export const IglBookingEvent: {
  prototype: IglBookingEvent;
  new (): IglBookingEvent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
