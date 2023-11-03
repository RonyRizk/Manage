import { EventEmitter } from '../../../stencil-public-runtime';
import { RoomType, RatePlan } from '../../../sample/channel/data';
export declare class IrMapping {
  mapReference: RoomType[];
  hostRoom: RoomType[];
  sendMappingToParent: EventEmitter;
  map: RoomType[];
  _onSaveMapping(): Promise<void>;
  componentWillLoad(): void;
  _onSelectMap(room: RoomType, value: RoomType, index: number): void;
  _onSelectRatePlan(ratePlan: RatePlan, _index: number, value: RatePlan, room: RoomType, index: number): void;
  _deselectRoom(room: RoomType, index: number): void;
  _deselectRatePlan(ratePlan: RatePlan, _index: number, room: RoomType, index: number): void;
  render(): any[];
}
