import type { Components, JSX } from "../types/components";

interface IglCalFooter extends Components.IglCalFooter, HTMLElement {}
export const IglCalFooter: {
  prototype: IglCalFooter;
  new (): IglCalFooter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
