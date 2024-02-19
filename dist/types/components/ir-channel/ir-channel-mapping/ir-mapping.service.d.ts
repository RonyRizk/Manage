export declare class IrMappingService {
  checkMappingExists(id: string, isRoomType: boolean, roomTypeId?: string): import("../../../models/IBooking").RoomDetail | import("../../../models/IBooking").RatePlanDetail;
  getAppropriateRooms(isRoomType: boolean, roomTypeId?: string): {
    id: string;
    name: string;
  }[];
}
