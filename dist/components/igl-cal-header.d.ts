import type { Components, JSX } from "../types/components";

interface IglCalHeader extends Components.IglCalHeader, HTMLElement {}
export const IglCalHeader: {
  prototype: IglCalHeader;
  new (): IglCalHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
