import { createStore } from "@stencil/store";
const initialState = {};
export const { state: interceptor_requests, onChange: onCalendarDatesChange } = createStore(initialState);
export function isRequestPending(url) {
  return interceptor_requests[url] === 'pending';
}
export default interceptor_requests;
//# sourceMappingURL=ir-interceptor.store.js.map
