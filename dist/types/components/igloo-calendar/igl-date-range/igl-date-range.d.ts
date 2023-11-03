import { EventEmitter } from "../../../stencil-public-runtime";
export declare class IglDateRange {
  message: string;
  defaultData: {
    [key: string]: any;
  };
  dateSelectEvent: EventEmitter<{
    [key: string]: any;
  }>;
  renderAgain: boolean;
  private totalNights;
  private fromDate;
  private toDate;
  private fromDateStr;
  private toDateStr;
  dateRangeInput: HTMLElement;
  getStringDateFormat(dt: any): string;
  componentWillLoad(): void;
  calculateTotalNights(): void;
  getFormattedDateString(dt: any): string;
  handleDateSelectEvent(key: any, data?: any): void;
  handleDateChange(evt: any): void;
  render(): any;
}
