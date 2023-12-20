import { EventEmitter } from '../../../stencil-public-runtime';
import { IToast } from '../../ir-toast/toast';
export declare class IglDateRange {
  defaultData: {
    [key: string]: any;
  };
  disabled: boolean;
  minDate: string;
  dateLabel: any;
  dateSelectEvent: EventEmitter<{
    [key: string]: any;
  }>;
  renderAgain: boolean;
  defaultTexts: any;
  toast: EventEmitter<IToast>;
  private totalNights;
  private fromDate;
  private toDate;
  private fromDateStr;
  private toDateStr;
  dateRangeInput: HTMLElement;
  private unsubscribe;
  getStringDateFormat(dt: any): string;
  componentWillLoad(): void;
  updateFromStore(): void;
  disconnectedCallback(): void;
  calculateTotalNights(): void;
  getFormattedDateString(dt: any): string;
  handleDateSelectEvent(key: any, data?: any): void;
  handleDateChange(evt: any): void;
  render(): any;
}
