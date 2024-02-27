import type { Components, JSX } from "../types/components";

interface IrDateView extends Components.IrDateView, HTMLElement {}
export const IrDateView: {
  prototype: IrDateView;
  new (): IrDateView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
