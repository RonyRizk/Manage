import { EventEmitter } from '../../../../stencil-public-runtime';
export declare class IglTbaBookingView {
  highlightToBeAssignedBookingEvent: EventEmitter;
  addToBeAssignedEvent: EventEmitter;
  scrollPageToRoom: EventEmitter;
  assignRoomEvent: EventEmitter<{
    [key: string]: any;
  }>;
  calendarData: {
    [key: string]: any;
  };
  selectedDate: any;
  defaultTexts: any;
  eventData: {
    [key: string]: any;
  };
  categoriesData: {
    [key: string]: any;
  };
  categoryId: any;
  categoryIndex: any;
  eventIndex: any;
  renderAgain: boolean;
  selectedRoom: number;
  private highlightSection;
  private allRoomsList;
  private toBeAssignedService;
  private unsubscribe;
  onSelectRoom(evt: any): void;
  componentShouldUpdate(newValue: string, oldValue: string, propName: string): boolean;
  componentWillLoad(): void;
  updateFromStore(): void;
  disconnectedCallback(): void;
  handleAssignUnit(event: any): Promise<void>;
  handleHighlightAvailability(): void;
  handleCloseAssignment(event: any): void;
  highlightBookingEvent(event: CustomEvent): void;
  renderView(): void;
  render(): any;
}
