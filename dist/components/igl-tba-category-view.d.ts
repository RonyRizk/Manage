import type { Components, JSX } from "../types/components";

interface IglTbaCategoryView extends Components.IglTbaCategoryView, HTMLElement {}
export const IglTbaCategoryView: {
  prototype: IglTbaCategoryView;
  new (): IglTbaCategoryView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
