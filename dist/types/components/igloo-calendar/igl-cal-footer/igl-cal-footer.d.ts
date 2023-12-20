import { EventEmitter } from "../../../stencil-public-runtime";
export declare class IglCalFooter {
  optionEvent: EventEmitter<{
    [key: string]: any;
  }>;
  calendarData: {
    [key: string]: any;
  };
  today: String;
  defaultTexts: any;
  private unsubscribe;
  handleOptionEvent(key: any, data?: string): void;
  componentWillLoad(): void;
  updateFromStore(): void;
  disconnectedCallback(): void;
  render(): any;
}
