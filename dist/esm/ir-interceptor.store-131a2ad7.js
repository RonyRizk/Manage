import { c as createStore } from './index-12cef0ac.js';

const initialState = {};
const { state: interceptor_requests, onChange: onCalendarDatesChange } = createStore(initialState);
function isRequestPending(url) {
  return interceptor_requests[url] === 'pending';
}

export { interceptor_requests as a, isRequestPending as i };

//# sourceMappingURL=ir-interceptor.store-131a2ad7.js.map