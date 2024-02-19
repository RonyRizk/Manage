'use strict';

const index = require('./index-d93aa7bb.js');

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannel: [],
  connected_channels: [],
};
const { state: channels_data, onChange: onChannelChange, dispose } = index.createStore(initialState);
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

exports.addMapping = addMapping;
exports.channels_data = channels_data;
exports.onChannelChange = onChannelChange;
exports.removedMapping = removedMapping;
exports.resetStore = resetStore;
exports.selectChannel = selectChannel;
exports.setMappedChannel = setMappedChannel;

//# sourceMappingURL=channel.store-1ae952be.js.map