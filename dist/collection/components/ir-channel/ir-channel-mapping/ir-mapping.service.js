export class IrMappingService {
  checkMappingExists(id, selected_channel) {
    return selected_channel.map.find(m => m.foreign_id === id);
  }
}
//# sourceMappingURL=ir-mapping.service.js.map
