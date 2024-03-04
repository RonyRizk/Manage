import { EventEmitter } from '../../../stencil-public-runtime';
import { IToast } from '../../ir-toast/toast';
export declare class IglDateRange {
  defaultData: {
    [key: string]: any;
  };
  disabled: boolean;
  minDate: string;
  dateLabel: string;
  maxDate: string;
  withDateDifference: boolean;
  dateSelectEvent: EventEmitter<{
    [key: string]: any;
  }>;
  renderAgain: boolean;
  toast: EventEmitter<IToast>;
  private totalNights;
  private fromDate;
  private toDate;
  private fromDateStr;
  private toDateStr;
  dateRangeInput: HTMLElement;
  getStringDateFormat(dt: Date): string;
  initializeDates(): void;
  componentWillLoad(): void;
  handleDataChange(newValue: any, oldValue: any): void;
  calculateTotalNights(): void;
  getFormattedDateString(dt: any): string;
  handleDateSelectEvent(key: any, data?: any): void;
  handleDateChange(evt: any): void;
  render(): any;
}
