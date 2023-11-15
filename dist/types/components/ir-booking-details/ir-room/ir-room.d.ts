import { EventEmitter } from '../../../stencil-public-runtime';
import { Room } from '../../../models/booking.dto';
export declare class IrRoom {
  item: Room;
  mealCodeName: string;
  myRoomTypeFoodCat: string;
  currency: string;
  collapsed: boolean;
  hasRoomEdit: boolean;
  hasRoomDelete: boolean;
  hasRoomAdd: boolean;
  hasCheckIn: boolean;
  hasCheckOut: boolean;
  pressCheckIn: EventEmitter;
  pressCheckOut: EventEmitter;
  handleClick(e: any): void;
  render(): any;
}
