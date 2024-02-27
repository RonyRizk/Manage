import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglCalFooter {
  optionEvent: EventEmitter<{
    [key: string]: any;
  }>;
  calendarData: {
    [key: string]: any;
  };
  today: String;
  highlightedDate: string;
  handleOptionEvent(key: any, data?: string): void;
  render(): any;
}
