import { EventEmitter } from '../../../stencil-public-runtime';
import { IReallocationPayload, IRoomNightsData } from "../../../models/property-types";
import { IToast } from "../../ir-toast/toast";
export declare class IglBookingEvent {
  private element;
  currency: any;
  is_vacation_rental: boolean;
  language: string;
  bookingEvent: {
    [key: string]: any;
  };
  allBookingEvents: {
    [key: string]: any;
  };
  countryNodeList: any;
  hideBubbleInfo: EventEmitter;
  updateEventData: EventEmitter;
  dragOverEventData: EventEmitter;
  showRoomNightsDialog: EventEmitter<IRoomNightsData>;
  showDialog: EventEmitter<IReallocationPayload>;
  resetStreachedBooking: EventEmitter<string>;
  toast: EventEmitter<IToast>;
  updateBookingEvent: EventEmitter<{
    [key: string]: any;
  }>;
  renderElement: boolean;
  position: {
    [key: string]: any;
  };
  isShrinking: boolean | null;
  dayWidth: number;
  eventSpace: number;
  vertSpace: number;
  private showInfoPopup;
  private bubbleInfoTopSide;
  private isStreatch;
  private eventsService;
  private bookingService;
  resizeSide: string;
  isDragging: boolean;
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
  initialWidth: number;
  initialLeft: number;
  finalWidth: number;
  dragInitPos: {
    [key: string]: any;
  };
  dragEndPos: {
    [key: string]: any;
  };
  elementRect: {
    [key: string]: any;
  };
  isTouchStart: boolean;
  moveDiffereneX: number;
  moveDiffereneY: number;
  private animationFrameId;
  handleMouseMoveBind: any;
  handleMouseUpBind: any;
  handleClickOutsideBind: any;
  componentWillLoad(): void;
  fetchAndAssignBookingData(): Promise<void>;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  handleClickOutside(event: Event): void;
  hideBubbleInfoPopup(event: CustomEvent): void;
  moveBookingToHandler(event: CustomEvent): Promise<void>;
  private setModalDescription;
  private resetBookingToInitialPosition;
  handleRevertBooking(event: CustomEvent<string>): void;
  checkIfSlotOccupied(toRoomId: any, from_date: any, to_date: any): any;
  renderAgain(): void;
  getUniqueId(): number;
  isSplitBooking(): boolean;
  isNewEvent(): boolean;
  isHighlightEventType(): boolean;
  getBookingId(): any;
  getBookingStatus(): any;
  getBookedBy(): any;
  getBookedRoomId(): any;
  getEventStartingDate(): Date;
  getEventEndingDate(): Date;
  getEventType(): any;
  getEventLegend(): any;
  getLegendOfStatus(aStatusId: any): any;
  getNoteNode(): any;
  getBalanceNode(): any;
  setStayDays(aStayDays: number): void;
  getStayDays(): any;
  getPosition(): {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  getNumber(aData: any): number;
  startDragging(event: any, side: string): any;
  handleMouseMove(event: any): void;
  handleMouseUp(): void;
  updateData(data: any): void;
  renderEventBookingNumber(): string;
  showEventInfo(showInfo: any): any;
  render(): any;
}
