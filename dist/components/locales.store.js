import { c as createStore } from './index2.js';

const initialState = {
  entries: null,
  direction: 'ltr',
};
const { state: locales, onChange: onCalendarDatesChange } = createStore(initialState);

export { locales as l };

//# sourceMappingURL=locales.store.js.map