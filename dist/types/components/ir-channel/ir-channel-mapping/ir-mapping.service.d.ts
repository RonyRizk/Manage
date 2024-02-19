export declare class IrMappingService {
  removedMapping(ir_id: string, isRoomType: boolean): void;
  checkMappingExists(id: string, isRoomType: boolean, roomTypeId?: string): {
    hide: boolean;
    occupancy: number;
    result: import("../../../models/IBooking").RoomDetail;
  } | {
    hide: boolean;
    occupancy: number;
    result: import("../../../models/IBooking").RatePlanDetail;
  };
  getAppropriateRooms(isRoomType: boolean, roomTypeId?: string): {
    id: string;
    name: string;
  }[];
}
