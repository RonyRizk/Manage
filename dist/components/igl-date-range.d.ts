import type { Components, JSX } from "../types/components";

interface IglDateRange extends Components.IglDateRange, HTMLElement {}
export const IglDateRange: {
  prototype: IglDateRange;
  new (): IglDateRange;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
