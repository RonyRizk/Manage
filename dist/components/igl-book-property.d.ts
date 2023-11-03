import type { Components, JSX } from "../types/components";

interface IglBookProperty extends Components.IglBookProperty, HTMLElement {}
export const IglBookProperty: {
  prototype: IglBookProperty;
  new (): IglBookProperty;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
