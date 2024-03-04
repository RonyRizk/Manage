import { Token } from "../models/Token";
import { IExposedHouseKeepingSetup, IInspectionMode } from "../models/housekeeping";
export declare class HouseKeepingService extends Token {
  getExposedHKSetup(property_id: number): Promise<IExposedHouseKeepingSetup>;
  setExposedInspectionMode(property_id: number, mode: IInspectionMode): Promise<any>;
}
