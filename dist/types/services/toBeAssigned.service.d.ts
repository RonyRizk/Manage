import { IRoomCategory, InnerRecord } from '../models/tobeassigned';
import { Token } from "../models/Token";
export declare class ToBeAssignedService extends Token {
  getUnassignedDates(propertyid: number, from_date: string, to_date: string): Promise<Record<number, InnerRecord>>;
  getUnassignedRooms(calendarFromDates: {
    from_date: string;
    to_date: string;
  }, propertyid: number, specific_date: string, roomInfo: any, formattedLegendData: any): Promise<IRoomCategory[]>;
  assignUnit(booking_nbr: string, identifier: string, pr_id: number): Promise<any>;
  private cleanSpacesAndSpecialChars;
  private transformToAssignable;
  addDefaultDateRange(roomCategory: IRoomCategory): void;
  private getRoomTypeId;
  private updateAvailableRooms;
  private convertUnassignedDates;
}
