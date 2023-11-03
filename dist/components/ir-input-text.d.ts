import type { Components, JSX } from "../types/components";

interface IrInputText extends Components.IrInputText, HTMLElement {}
export const IrInputText: {
  prototype: IrInputText;
  new (): IrInputText;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
