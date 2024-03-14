import type { Components, JSX } from "../types/components";

interface IrHkArchive extends Components.IrHkArchive, HTMLElement {}
export const IrHkArchive: {
  prototype: IrHkArchive;
  new (): IrHkArchive;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
