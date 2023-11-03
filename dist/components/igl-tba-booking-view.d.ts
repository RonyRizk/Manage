import type { Components, JSX } from "../types/components";

interface IglTbaBookingView extends Components.IglTbaBookingView, HTMLElement {}
export const IglTbaBookingView: {
  prototype: IglTbaBookingView;
  new (): IglTbaBookingView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
