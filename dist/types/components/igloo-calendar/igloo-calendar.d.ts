import { EventEmitter } from '../../stencil-public-runtime';
import { Moment } from 'moment';
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
  calculateUnassignedDates: EventEmitter;
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
  unassignedDates: {};
  private bookingService;
  private countryNodeList;
  private visibleCalendarCells;
  private scrollContainer;
  private today;
  private roomService;
  private eventsService;
  private toBeAssignedService;
  private socket;
  private reachedEndOfCalendar;
  ticketChanged(): void;
  componentWillLoad(): void;
  initializeApp(): void;
  componentDidLoad(): void;
  handleDeleteEvent(ev: CustomEvent): Promise<void>;
  checkBookingAvailability(data: any): any;
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
  private AddOrUpdateRoomBookings;
  private transformDateForScroll;
  scrollPageToRoom(event: CustomEvent): void;
  handleBookingDatasChange(event: CustomEvent): void;
  shouldRenderCalendarView(): any;
  onOptionSelect(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  addDatesToCalendar(fromDate: string, toDate: string): Promise<void>;
  handleDateSearch(dates: {
    start: Moment;
    end: Moment;
  }): Promise<void>;
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
