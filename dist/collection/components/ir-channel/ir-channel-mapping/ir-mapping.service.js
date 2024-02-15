import channels_data from "../../../../../src/stores/channel.store";
export class IrMappingService {
  checkMappingExists(id) {
    return channels_data.mappedChannel.find(m => m.channel_id === id);
  }
}
//# sourceMappingURL=ir-mapping.service.js.map
