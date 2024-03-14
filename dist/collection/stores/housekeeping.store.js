import { createStore } from "@stencil/store";
const initialValue = {
  default_properties: undefined,
  hk_criteria: undefined,
  hk_tasks: undefined,
  pending_housekeepers: [],
};
export const { state: housekeeping_store } = createStore(initialValue);
export function updateHKStore(key, value) {
  housekeeping_store[key] = value;
}
export function getDefaultProperties() {
  return housekeeping_store.default_properties;
}
export default housekeeping_store;
//# sourceMappingURL=housekeeping.store.js.map
