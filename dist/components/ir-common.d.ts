import type { Components, JSX } from "../types/components";

interface IrCommon extends Components.IrCommon, HTMLElement {}
export const IrCommon: {
  prototype: IrCommon;
  new (): IrCommon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
