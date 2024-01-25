import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglToBeAssigned {
  unassignedDatesProp: any;
  propertyid: number;
  from_date: string;
  to_date: string;
  loadingMessage: string;
  calendarData: {
    [key: string]: any;
  };
  optionEvent: EventEmitter<{
    [key: string]: any;
  }>;
  reduceAvailableUnitEvent: EventEmitter<{
    [key: string]: any;
  }>;
  showBookingPopup: EventEmitter;
  addToBeAssignedEvent: EventEmitter;
  highlightToBeAssignedBookingEvent: EventEmitter;
  showDatesList: boolean;
  renderAgain: boolean;
  orderedDatesList: any[];
  private isGotoToBeAssignedDate;
  private isLoading;
  private selectedDate;
  private data;
  private today;
  private categoriesData;
  private toBeAssignedService;
  private unassignedDates;
  componentWillLoad(): void;
  handleUnassignedDatesToBeAssignedChange(newValue: any): void;
  handleAssignUnit(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  updateCategories(key: any, calendarData: any): Promise<void>;
  reArrangeData(): Promise<void>;
  componentDidLoad(): Promise<void>;
  gotoDate(event: CustomEvent): Promise<void>;
  showForDate(dateStamp: any, withLoading?: boolean): Promise<void>;
  getDay(dt: any): string;
  getLocalizedDayOfWeek(date: any, locale: any): any;
  handleOptionEvent(key: any, data?: string): void;
  showUnassignedDate(): void;
  getToBeAssignedEntities(): void;
  getCategoryView(): any[];
  renderView(): void;
  render(): any;
}
