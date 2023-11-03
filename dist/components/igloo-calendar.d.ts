import type { Components, JSX } from "../types/components";

interface IglooCalendar extends Components.IglooCalendar, HTMLElement {}
export const IglooCalendar: {
  prototype: IglooCalendar;
  new (): IglooCalendar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
