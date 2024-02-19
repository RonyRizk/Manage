import { c as createStore } from './axios-248c334f.js';

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannels: [],
  connected_channels: [],
  isConnectedToChannel: false,
  channel_settings: null,
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
function updateChannelSettings(key, value) {
  if (!channels_data.channel_settings) {
    channels_data.channel_settings = {
      hotel_id: '',
      hotel_title: '',
    };
  }
  channels_data.channel_settings[key] = value;
}
function setMappedChannel() {
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id === channels_data.selectedChannel.id);
  channels_data.mappedChannels = [...selectedChannelMap.map];
}
function resetStore() {
  channels_data.selectedChannel = null;
  channels_data.mappedChannels = [];
  channels_data.isConnectedToChannel = false;
  channels_data.channel_settings = null;
}
function addMapping(ir_id, fr_id) {
  channels_data.mappedChannels.push({
    channel_id: fr_id,
    ir_id,
  });
}
function removedMapping(ir_id) {
  channels_data.mappedChannels = channels_data.mappedChannels.filter(c => c.ir_id !== ir_id);
}
function testConnection() {
  const hotelConnection = channels_data.selectedChannel.properties.find(property => property.id === channels_data.channel_settings.hotel_id);
  if (!hotelConnection) {
    return;
  }
  channels_data.selectedChannel.property = hotelConnection;
  channels_data.isConnectedToChannel = true;
}

export { removedMapping as a, addMapping as b, channels_data as c, setMappedChannel as d, onChannelChange as o, resetStore as r, selectChannel as s, testConnection as t, updateChannelSettings as u };

//# sourceMappingURL=channel.store-c348aa20.js.map