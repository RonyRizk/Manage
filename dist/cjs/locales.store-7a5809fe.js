'use strict';

const channel_store = require('./channel.store-9a8927a2.js');

const initialState = {
  entries: null,
  direction: 'ltr',
};
const { state: locales, onChange: onCalendarDatesChange } = channel_store.createStore(initialState);

exports.locales = locales;

//# sourceMappingURL=locales.store-7a5809fe.js.map