import type { Components, JSX } from "../types/components";

interface IrHkTeam extends Components.IrHkTeam, HTMLElement {}
export const IrHkTeam: {
  prototype: IrHkTeam;
  new (): IrHkTeam;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
