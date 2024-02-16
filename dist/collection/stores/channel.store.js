import { createStore } from "@stencil/store";
const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannel: [],
  connected_channels: [],
};
export const { state: channels_data, onChange: onChannelChange } = createStore(initialState);
export function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
    return;
  }
  const selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id === selectedChannel.id);
  channels_data.mappedChannel = selectedChannelMap.map;
  channels_data.selectedChannel = selectedChannel;
}
export function addMapping(ir_id, fr_id) {
  channels_data.mappedChannel.push({
    channel_id: fr_id,
    ir_id,
  });
}
export default channels_data;
//# sourceMappingURL=channel.store.js.map
