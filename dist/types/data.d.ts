export declare const MappingModal: RoomType[];
export declare const Map: RoomType[];
export declare class ChannelManager {
  id: string;
  group: string;
  title: string;
  property: string;
  hotelId: string;
  minimumStay: number;
  RoomsMapping: RoomType[];
}
export declare class RoomType {
  id: string;
  name: string;
  value: string;
  roomCapacity: number;
  mapped?: 'notMapped' | 'mapping' | 'mapped';
  mappedId?: string;
  mappedName?: string;
  ratePlans: RatePlan[];
}
export declare class RatePlan {
  id: string;
  name: string;
  value: string;
  price: string;
  mapped?: 'notMapped' | 'mapping' | 'mapped';
  mappedId?: string;
  mappedName?: string;
}
