import { EventEmitter } from '../../../stencil-public-runtime';
import { IToast } from '../../ir-toast/toast';
export declare class IglDateRange {
  defaultData: {
    [key: string]: any;
  };
  disabled: boolean;
  minDate: string;
  dateLabel: any;
  maxDate: string;
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
  getStringDateFormat(dt: any): string;
  componentWillLoad(): void;
  calculateTotalNights(): void;
  getFormattedDateString(dt: any): string;
  handleDateSelectEvent(key: any, data?: any): void;
  handleDateChange(evt: any): void;
  render(): any;
}
