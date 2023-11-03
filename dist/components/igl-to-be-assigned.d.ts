import type { Components, JSX } from "../types/components";

interface IglToBeAssigned extends Components.IglToBeAssigned, HTMLElement {}
export const IglToBeAssigned: {
  prototype: IglToBeAssigned;
  new (): IglToBeAssigned;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
