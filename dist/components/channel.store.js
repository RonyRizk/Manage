import { c as createStore } from './index2.js';

const initialState = {
  channels: [],
  selectedChannel: null,
  mappedChannels: [],
  connected_channels: [],
  isConnectedToChannel: false,
  channel_settings: null,
  property_id: null,
  channel_id: -1,
  is_active: false,
};
const { state: channels_data, onChange: onChannelChange, dispose } = createStore(initialState);
function setChannelIdAndActiveState(id, is_active) {
  channels_data.channel_id = id;
  channels_data.is_active = is_active;
}
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
    return;
  }
  const selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
  if (selectedChannel) {
    channels_data.selectedChannel = selectedChannel;
  }
  else {
    channels_data.selectedChannel = {
      id: channel_id,
      name: '',
      properties: [],
    };
  }
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
  let selectedChannelMap = channels_data.connected_channels.find(c => c.channel.id.toString() === channels_data.selectedChannel.id.toString());
  if (!selectedChannelMap) {
    channels_data.mappedChannels = [];
    return;
  }
  channels_data.mappedChannels = [...selectedChannelMap.map];
}
function resetStore() {
  channels_data.selectedChannel = null;
  channels_data.mappedChannels = [];
  channels_data.isConnectedToChannel = false;
  channels_data.channel_settings = null;
}
function addMapping(ir_id, fr_id, isRoomType) {
  channels_data.mappedChannels.push({
    channel_id: fr_id,
    ir_id,
    type: isRoomType ? 'room_type' : 'rate_plan',
  });
}
function testConnection() {
  var _a;
  // const hotelConnection = channels_data.selectedChannel.properties.find(property => property.id === 'd09e6374-1ebf-45e0-a130-64c8c9930987');
  const hotelConnection = channels_data.selectedChannel.properties.find(property => property.id === channels_data.channel_settings.hotel_id);
  if (!hotelConnection) {
    return false;
  }
  channels_data.selectedChannel.property = hotelConnection;
  if (channels_data.mappedChannels.length === 0) {
    channels_data.mappedChannels.push({ ir_id: ((_a = channels_data.property_id) !== null && _a !== void 0 ? _a : -1).toString(), channel_id: channels_data.channel_settings.hotel_id, type: 'property' });
  }
  channels_data.isConnectedToChannel = true;
  return true;
}

export { selectChannel as a, addMapping as b, channels_data as c, setMappedChannel as d, onChannelChange as o, resetStore as r, setChannelIdAndActiveState as s, testConnection as t, updateChannelSettings as u };

//# sourceMappingURL=channel.store.js.map