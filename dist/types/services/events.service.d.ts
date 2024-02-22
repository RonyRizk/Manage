import { Token } from "../models/Token";
export declare class EventsService extends Token {
  private readonly bookingService;
  reallocateEvent(pool: string, destination_pr_id: number, from_date: string, to_date: string): Promise<any>;
  deleteEvent(POOL: string): Promise<any>;
  updateBlockedEvent(bookingEvent: any): Promise<any>;
  private formatDate;
}
