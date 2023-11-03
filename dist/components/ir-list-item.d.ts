import type { Components, JSX } from "../types/components";

interface IrListItem extends Components.IrListItem, HTMLElement {}
export const IrListItem: {
  prototype: IrListItem;
  new (): IrListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
