import type { Components, JSX } from "../types/components";

interface IglCalBody extends Components.IglCalBody, HTMLElement {}
export const IglCalBody: {
  prototype: IglCalBody;
  new (): IglCalBody;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
