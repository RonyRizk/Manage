import type { Components, JSX } from "../types/components";

interface IrHkTasks extends Components.IrHkTasks, HTMLElement {}
export const IrHkTasks: {
  prototype: IrHkTasks;
  new (): IrHkTasks;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
