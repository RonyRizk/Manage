import { c as createStore } from './index2.js';

const initialState = {
  channels: [],
  selectedChannel: null,
};
const { state: channels_data, onChange: onChannelChange } = createStore(initialState);
function selectChannel(channel_id) {
  if (channel_id === '') {
    channels_data.selectedChannel = null;
  }
  channels_data.selectedChannel = channels_data.channels.find(c => c.id.toString() === channel_id);
}

export { channels_data as c, onChannelChange as o, selectChannel as s };

//# sourceMappingURL=channel.store.js.map