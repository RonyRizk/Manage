import type { Components, JSX } from "../types/components";

interface IrHousekeeping extends Components.IrHousekeeping, HTMLElement {}
export const IrHousekeeping: {
  prototype: IrHousekeeping;
  new (): IrHousekeeping;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
