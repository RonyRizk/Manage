import calendar_data from "../../../../../src/stores/calendar-data";
import channels_data from "../../../../../src/stores/channel.store";
export class IrMappingService {
  removedMapping(ir_id, isRoomType) {
    let selectedChannels = [...channels_data.mappedChannels];
    if (isRoomType) {
      const toBeRemovedRoomType = calendar_data.roomsInfo.find(room => room.id.toString() === ir_id);
      selectedChannels = selectedChannels.filter(c => toBeRemovedRoomType.rateplans.find(rate_plan => rate_plan.id.toString() === c.ir_id) === undefined);
    }
    channels_data.mappedChannels = selectedChannels.filter(c => c.ir_id !== ir_id);
  }
  checkMappingExists(id, isRoomType, roomTypeId) {
    const mapped_id = channels_data.mappedChannels.find(m => m.channel_id === id);
    if (!mapped_id) {
      if (!isRoomType) {
        const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
        if (!matchingRoomType) {
          return { hide: true, result: undefined, occupancy: undefined };
        }
      }
      return { hide: false, result: undefined, occupancy: undefined };
    }
    if (isRoomType) {
      const room_type = calendar_data.roomsInfo.find(room => room.id.toString() === mapped_id.ir_id);
      return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type };
    }
    if (!roomTypeId) {
      throw new Error('Missing room type id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    const room_type = calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    if (!room_type) {
      throw new Error('Invalid Room type');
    }
    return { hide: false, occupancy: room_type.occupancy_default.adult_nbr, result: room_type.rateplans.find(r => r.id.toString() === mapped_id.ir_id) };
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendar_data.roomsInfo.filter(room => channels_data.mappedChannels.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    const matchingRoomType = channels_data.mappedChannels.find(m => m.channel_id.toString() === roomTypeId);
    if (!matchingRoomType) {
      throw new Error('Invalid room type id');
    }
    const selectedRoomType = calendar_data.roomsInfo.find(room => room.id.toString() === matchingRoomType.ir_id);
    return selectedRoomType.rateplans
      .filter(rate_plan => channels_data.mappedChannels.find(r => rate_plan.id.toString() === r.ir_id) === undefined)
      .map(rate_plan => ({
      id: rate_plan.id.toString(),
      name: rate_plan.name,
    }));
  }
}
//# sourceMappingURL=ir-mapping.service.js.map
