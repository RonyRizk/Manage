import { createStore } from "@stencil/store";
const initialState = {
  entries: null,
  direction: 'ltr',
};
export const { state: locales, onChange: onCalendarDatesChange } = createStore(initialState);
export default locales;
//# sourceMappingURL=locales.store.js.map
