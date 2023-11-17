import { EventEmitter } from '../../stencil-public-runtime';
import { RoomBlockDetails, RoomBookingDetails } from '../../models/IBooking';
export declare class IglooCalendar {
  propertyid: number;
  from_date: string;
  to_date: string;
  language: string;
  baseurl: string;
  loadingMessage: string;
  currencyName: string;
  ticket: string;
  private element;
  dragOverHighlightElement: EventEmitter;
  moveBookingTo: EventEmitter;
  calendarData: {
    [key: string]: any;
  };
  days: {
    [key: string]: any;
  }[];
  scrollViewDragging: boolean;
  bookingItem: {
    [key: string]: any;
  };
  showLegend: boolean;
  showPaymentDetails: boolean;
  showToBeAssigned: boolean;
  private bookingService;
  private countryNodeList;
  private visibleCalendarCells;
  private scrollContainer;
  private today;
  private roomService;
  private eventsService;
  private toBeAssignedService;
  ticketChanged(): Promise<void>;
  componentWillLoad(): Promise<void>;
  initializeApp(): void;
  componentDidLoad(): void;
  handledeleteEvent(ev: CustomEvent): Promise<void>;
  updateBookingEventsDateRange(eventData: any): void;
  setRoomsData(roomServiceResp: any): void;
  getLegendData(aData: any): any;
  getStartingDateOfCalendar(): any;
  getEndingDateOfCalendar(): any;
  getDay(dt: any): string;
  getLocalizedDayOfWeek(date: any, locale: any): any;
  getLocalizedMonth(date: any, locale?: string): string;
  getDateStr(date: any, locale?: string): string;
  scrollToElement(goToDate: any): void;
  onBookingCreation(event: CustomEvent<RoomBookingDetails[]>): void;
  onBlockCreation(event: CustomEvent<RoomBlockDetails>): void;
  private transformDateForScroll;
  scrollPageToRoom(event: CustomEvent): void;
  shouldRenderCalendarView(): any;
  onOptionSelect(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  closeSideMenu(): void;
  scrollViewDragPos: {
    top: number;
    left: number;
    x: number;
    y: number;
  };
  dragScrollContent(event: MouseEvent): void;
  onScrollContentMoveHandler: EventListener;
  onScrollContentMoveEndHandler: EventListener;
  calendarScrolling(): void;
  hasAncestorWithClass(element: HTMLElement, className: string): boolean;
  showBookingPopupEventDataHandler(event: CustomEvent): void;
  updateEventDataHandler(event: CustomEvent): void;
  dragOverEventDataHandler(event: CustomEvent): void;
  highlightDragOver(hightLightElement: any, currentPosition: any): Promise<void>;
  render(): any;
}
