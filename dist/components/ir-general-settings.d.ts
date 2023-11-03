import type { Components, JSX } from "../types/components";

interface IrGeneralSettings extends Components.IrGeneralSettings, HTMLElement {}
export const IrGeneralSettings: {
  prototype: IrGeneralSettings;
  new (): IrGeneralSettings;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
