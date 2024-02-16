import calendar_data from "../../../../../src/stores/calendar-data";
import channels_data from "../../../../../src/stores/channel.store";
export class IrMappingService {
  checkMappingExists(id) {
    return channels_data.mappedChannel.find(m => m.channel_id === id);
  }
  getAppropriateRooms(isRoomType, roomTypeId) {
    if (isRoomType) {
      const filteredRoomTypes = calendar_data.roomsInfo.filter(room => channels_data.mappedChannel.find(m => m.ir_id.toString() === room.id.toString()) === undefined && room.is_active);
      return filteredRoomTypes.map(room => ({ id: room.id.toString(), name: room.name }));
    }
    if (!roomTypeId) {
      throw new Error('Missing roomType id');
    }
    //find the selected roomType
    const selectedRoomType = calendar_data.roomsInfo.filter(room => channels_data.mappedChannel.find(m => m.channel_id.toString() === roomTypeId) && room.is_active);
    console.log(selectedRoomType);
    // console.log(filteredRoomTypes);
    //filter all the room types that are taken
  }
}
//# sourceMappingURL=ir-mapping.service.js.map
