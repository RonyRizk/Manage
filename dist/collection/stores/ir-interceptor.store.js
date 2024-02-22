import { createStore } from "@stencil/store";
const initialState = { status: null };
export const { state: interceptor_requests, onChange: onCalendarDatesChange } = createStore(initialState);
export default interceptor_requests;
//# sourceMappingURL=ir-interceptor.store.js.map
