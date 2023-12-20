import { EventEmitter } from '../../../stencil-public-runtime';
import { Languages } from '../../../redux/features/languages';
export declare class IglBlockDatesView {
  defaultData: {
    [key: string]: any;
  };
  fromDate: string;
  toDate: string;
  entryDate: string;
  entryHour: number;
  isEventHover: boolean;
  entryMinute: number;
  defaultTexts: Languages;
  renderAgain: boolean;
  dataUpdateEvent: EventEmitter<{
    [key: string]: any;
  }>;
  private blockDatesData;
  private releaseList;
  private bookingService;
  private unsubscribe;
  componentWillLoad(): Promise<void>;
  updateFromStore(): void;
  disconnectedCallback(): void;
  handleOptionalReason(event: any): void;
  handleReleaseAfterChange(evt: any): void;
  emitData(): void;
  getReleaseHoursString(): string;
  formatNumber(value: number): string | number;
  handleOutOfService(evt: any): void;
  renderPage(): void;
  render(): any;
}
