import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglBookingEvent {
  private element;
  currency: any;
  is_vacation_rental: boolean;
  hideBubbleInfo: EventEmitter;
  updateEventData: EventEmitter;
  dragOverEventData: EventEmitter;
  bookingEvent: {
    [key: string]: any;
  };
  allBookingEvents: {
    [key: string]: any;
  };
  countryNodeList: any;
  renderElement: boolean;
  position: {
    [key: string]: any;
  };
  dayWidth: number;
  eventSpace: number;
  vertSpace: number;
  private showInfoPopup;
  private bubbleInfoTopSide;
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
  handleMouseMoveBind: any;
  handleMouseUpBind: any;
  handleClickOutsideBind: any;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  handleClickOutside(event: Event): void;
  hideBubbleInfoPopup(event: CustomEvent): void;
  moveBookingToHandler(event: CustomEvent): Promise<void>;
  renderAgain(): void;
  getUniqueId(): number;
  onMoveUpdateBooking(data: any): void;
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
  showEventInfo(showInfo: any): any;
  render(): any;
}
