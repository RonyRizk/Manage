import type { Components, JSX } from "../types/components";

interface IglApplicationInfo extends Components.IglApplicationInfo, HTMLElement {}
export const IglApplicationInfo: {
  prototype: IglApplicationInfo;
  new (): IglApplicationInfo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
