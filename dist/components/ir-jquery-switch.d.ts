import type { Components, JSX } from "../types/components";

interface IrJquerySwitch extends Components.IrJquerySwitch, HTMLElement {}
export const IrJquerySwitch: {
  prototype: IrJquerySwitch;
  new (): IrJquerySwitch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
