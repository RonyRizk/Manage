export declare class EventsService {
  private readonly bookingService;
  reallocateEvent(pool: string, destination_pr_id: number, from_date: string, to_date: string): Promise<any>;
  deleteEvent(POOL: string): Promise<any>;
  updateBlockedEvent(bookingEvent: any): Promise<void>;
  private formatDate;
}
