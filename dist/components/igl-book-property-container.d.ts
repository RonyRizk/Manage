import type { Components, JSX } from "../types/components";

interface IglBookPropertyContainer extends Components.IglBookPropertyContainer, HTMLElement {}
export const IglBookPropertyContainer: {
  prototype: IglBookPropertyContainer;
  new (): IglBookPropertyContainer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
