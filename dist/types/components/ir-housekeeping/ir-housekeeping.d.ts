import { IHKStatuses } from "../../models/housekeeping";
export declare class IrHousekeeping {
  language: string;
  ticket: string;
  baseurl: string;
  propertyid: number;
  isLoading: boolean;
  exposedHouseKeepingStatuses: IHKStatuses[];
  private roomService;
  private houseKeepingService;
  componentWillLoad(): void;
  ticketChanged(newValue: string, oldValue: string): Promise<void>;
  initializeApp(): Promise<void>;
  render(): any;
}
