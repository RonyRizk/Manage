export declare class IrMappingService {
  checkMappingExists(id: string, isRoomType: boolean, roomTypeId?: string): {
    hide: boolean;
    result: import("../../../models/IBooking").RoomDetail;
  } | {
    hide: boolean;
    result: import("../../../models/IBooking").RatePlanDetail;
  };
  getAppropriateRooms(isRoomType: boolean, roomTypeId?: string): {
    id: string;
    name: string;
  }[];
}
