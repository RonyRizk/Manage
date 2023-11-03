import type { Components, JSX } from "../types/components";

interface IrInterceptor extends Components.IrInterceptor, HTMLElement {}
export const IrInterceptor: {
  prototype: IrInterceptor;
  new (): IrInterceptor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
