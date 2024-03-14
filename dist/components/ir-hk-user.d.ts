import type { Components, JSX } from "../types/components";

interface IrHkUser extends Components.IrHkUser, HTMLElement {}
export const IrHkUser: {
  prototype: IrHkUser;
  new (): IrHkUser;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
