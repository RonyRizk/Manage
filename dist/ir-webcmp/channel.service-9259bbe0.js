import { T as Token } from './Token-d139c82c.js';
import { c as calendar_data } from './calendar-data-e3f169d0.js';
import { c as channels_data } from './channel.store-c2c85d22.js';
import { a as axios } from './index-315af25e.js';

class ChannelService extends Token {
  async getExposedChannels() {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Channels?Ticket=${token}`, {});
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        const results = data.My_Result;
        channels_data.channels = [...results];
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getExposedConnectedChannels(property_id) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Connected_Channels?Ticket=${token}`, { property_id });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        channels_data.connected_channels = [...data.My_Result];
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async saveConnectedChannel(is_remove) {
    try {
      const body = {
        id: channels_data.channel_id,
        title: channels_data.channel_settings.hotel_title,
        is_active: channels_data.is_active,
        channel: { id: channels_data.selectedChannel.id, name: channels_data.selectedChannel.name },
        property: { id: calendar_data.id, name: calendar_data.name },
        map: channels_data.mappedChannels,
        is_remove,
      };
      const token = this.getToken();
      if (!token) {
        throw new Error('Invalid Token');
      }
      const { data } = await axios.post(`/Handle_Connected_Channel?Ticket=${token}`, body);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }
}

export { ChannelService as C };

//# sourceMappingURL=channel.service-9259bbe0.js.map