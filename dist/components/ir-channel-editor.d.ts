import type { Components, JSX } from "../types/components";

interface IrChannelEditor extends Components.IrChannelEditor, HTMLElement {}
export const IrChannelEditor: {
  prototype: IrChannelEditor;
  new (): IrChannelEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
