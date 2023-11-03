export declare const MappingModal: RoomType[];
export declare const Map: RoomType[];
export declare class ChannelManager {
  id: string;
  title: string;
  channel: string;
  property: string;
  hotelId: string;
  status: 'Active' | 'Disabled';
  minimumStay: string;
  RoomsMapping: RoomType[];
}
export declare class RoomType {
  id: string;
  name: string;
  value: any;
  roomCapacity: number;
  mapped?: 'notMapped' | 'mapping' | 'mapped';
  mappedId?: string;
  mappedName?: string;
  ratePlans: RatePlan[];
  selectedPlans?: any[];
}
export declare class RatePlan {
  id: string;
  name: string;
  value: any;
  price: string;
  mapped?: 'notMapped' | 'mapping' | 'mapped';
  mappedId?: string;
  mappedName?: string;
}
