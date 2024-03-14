import { Token } from "../models/Token";
import { IExposedHouseKeepingSetup, IInspectionMode, IPropertyHousekeepingAssignment, THKUser, TPendingHkSetupParams } from "../models/housekeeping";
export declare class HouseKeepingService extends Token {
  getExposedHKSetup(property_id: number): Promise<IExposedHouseKeepingSetup>;
  getExposedHKStatusCriteria(property_id: number): Promise<IExposedHouseKeepingSetup>;
  setExposedInspectionMode(property_id: number, mode: IInspectionMode): Promise<any>;
  manageExposedAssignedUnitToHKM(property_id: number, assignments: IPropertyHousekeepingAssignment[]): Promise<any>;
  editExposedHKM(params: THKUser, is_to_remove?: boolean): Promise<any>;
  getHKPendingActions(params: TPendingHkSetupParams): Promise<any>;
  executeHKAction(params: any): Promise<void>;
  generateUserName(name: string): Promise<any>;
}
