import { EventEmitter } from "../../stencil-public-runtime";
import moment from "moment";
export declare class IrDatePicker {
  private element;
  fromDate: Date;
  toDate: Date;
  opens: "left" | "right" | "center";
  autoApply: boolean;
  firstDay: number;
  monthNames: string[];
  daysOfWeek: string[];
  format: string;
  separator: string;
  applyLabel: string;
  cancelLabel: string;
  fromLabel: string;
  toLabel: string;
  customRangeLabel: string;
  weekLabel: string;
  maxSpan: moment.DurationInputArg1;
  dateChanged: EventEmitter<{
    start: moment.Moment;
    end: moment.Moment;
  }>;
  dateRangeInput: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
