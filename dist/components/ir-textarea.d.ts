import type { Components, JSX } from "../types/components";

interface IrTextarea extends Components.IrTextarea, HTMLElement {}
export const IrTextarea: {
  prototype: IrTextarea;
  new (): IrTextarea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
