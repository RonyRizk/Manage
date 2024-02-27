import moment from 'moment';
export declare class IrDateView {
  from_date: string | Date | moment.Moment;
  to_date: string | Date | moment.Moment;
  showDateDifference: boolean;
  dateOption: string;
  dates: {
    from_date: string;
    to_date: string;
    date_diffrence: number;
  };
  componentWillLoad(): void;
  handleFromDateChange(newVal: any, oldVal: any): void;
  handleToDateChange(newVal: any, oldVal: any): void;
  initializeDates(): void;
  convertDate(key: 'from_date' | 'to_date', date: string | Date | moment.Moment): void;
  render(): any;
}
