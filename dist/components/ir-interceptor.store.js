import { c as createStore } from './index2.js';

const initialState = { status: null };
const { state: interceptor_requests, onChange: onCalendarDatesChange } = createStore(initialState);

export { interceptor_requests as i };

//# sourceMappingURL=ir-interceptor.store.js.map