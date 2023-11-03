import type { Components, JSX } from "../types/components";

interface IglLegends extends Components.IglLegends, HTMLElement {}
export const IglLegends: {
  prototype: IglLegends;
  new (): IglLegends;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
