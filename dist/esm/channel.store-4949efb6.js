import { c as createStore } from './index-2bd379e0.js';

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannel: [],
  connected_channels: [],
};
const { state: channels_data, onChange: onChannelChange } = createStore(initialState);
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
    return;
  }
  const selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id === selectedChannel.id);
  channels_data.mappedChannel = selectedChannelMap.map;
  channels_data.selectedChannel = selectedChannel;
}
function addMapping(ir_id, fr_id) {
  channels_data.mappedChannel.push({
    channel_id: fr_id,
    ir_id,
  });
}

export { addMapping as a, channels_data as c, onChannelChange as o, selectChannel as s };

//# sourceMappingURL=channel.store-4949efb6.js.map