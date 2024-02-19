import { RoomDetail, RatePlanDetail } from "../../../models/IBooking";
export declare class IrChannelMapping {
  activeMapField: string;
  availableRooms: {
    id: string;
    name: string;
  }[];
  private mappingService;
  setActiveField(id: string, isRoomType: boolean, roomTypeId?: string): void;
  renderMappingStatus(mappedField: {
    hide: boolean;
    result: RoomDetail;
  } | {
    hide: boolean;
    result: RatePlanDetail;
  }, id: string, isRoomType: boolean, roomTypeId?: string): any;
  render(): any;
}
