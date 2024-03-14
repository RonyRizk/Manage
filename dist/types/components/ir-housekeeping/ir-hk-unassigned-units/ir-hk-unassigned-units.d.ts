import { IHouseKeepers } from "../../../models/housekeeping";
import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrHkUnassignedUnits {
  user: IHouseKeepers | null;
  renderAgain: boolean;
  closeSideBar: EventEmitter<null>;
  resetData: EventEmitter<null>;
  private assignedUnits;
  private housekeepingService;
  componentWillLoad(): void;
  assignUnit(unit_id: number, hk_id: number | null, checked: boolean): void;
  assignUnits(): Promise<void>;
  renderRooms(): any[];
  render(): any;
}
