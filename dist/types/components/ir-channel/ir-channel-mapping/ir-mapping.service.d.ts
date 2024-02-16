export declare class IrMappingService {
  checkMappingExists(id: string): import("../../../models/calendarData").IMap;
  getAppropriateRooms(isRoomType: boolean, roomTypeId?: string): {
    id: string;
    name: string;
  }[];
}
