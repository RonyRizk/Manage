export declare class IrChannelMapping {
  activeMapField: string;
  availableRooms: {
    id: string;
    name: string;
  }[];
  private mappingService;
  setActiveField(id: string, isRoomType: boolean, roomTypeId?: string): void;
  renderMappingStatus(id: string, isRoomType: boolean, roomTypeId?: string): any;
  render(): any;
}
