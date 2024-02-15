'use strict';

const axios = require('./axios-394374e5.js');

const initialState = {
  channels: [],
  selectedChannel: null,
};
const { state: channels_data, onChange: onChannelChange } = axios.createStore(initialState);
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
  }
  channels_data.selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
}

exports.channels_data = channels_data;
exports.onChannelChange = onChannelChange;
exports.selectChannel = selectChannel;

//# sourceMappingURL=channel.store-0113fdbd.js.map