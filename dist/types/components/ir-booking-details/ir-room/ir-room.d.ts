import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrRoom {
  item: any;
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
