import { c as createStore } from './index2.js';

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannel: [],
  connected_channels: [],
};
const { state: channels_data, onChange: onChannelChange, dispose } = createStore(initialState);
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
    return;
  }
  const selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
  channels_data.selectedChannel = selectedChannel;
  setMappedChannel();
}
function setMappedChannel() {
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id === channels_data.selectedChannel.id);
  channels_data.mappedChannel = [...selectedChannelMap.map];
}
function resetStore() {
  channels_data.selectedChannel = null;
  channels_data.mappedChannel = [];
}
function addMapping(ir_id, fr_id) {
  channels_data.mappedChannel.push({
    channel_id: fr_id,
    ir_id,
  });
}
function removedMapping(ir_id) {
  channels_data.mappedChannel = channels_data.mappedChannel.filter(c => c.ir_id !== ir_id);
}

export { removedMapping as a, addMapping as b, channels_data as c, setMappedChannel as d, onChannelChange as o, resetStore as r, selectChannel as s };

//# sourceMappingURL=channel.store.js.map