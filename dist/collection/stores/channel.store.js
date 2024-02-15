import { createStore } from "@stencil/store";
const initialState = {
  channels: [],
  selectedChannel: null,
};
export const { state: channels_data, onChange: onChannelChange } = createStore(initialState);
export function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
  }
  channels_data.selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
}
export default channels_data;
//# sourceMappingURL=channel.store.js.map
