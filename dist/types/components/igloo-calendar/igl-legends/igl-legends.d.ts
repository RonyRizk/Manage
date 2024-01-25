import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IglLegends {
  optionEvent: EventEmitter<{
    [key: string]: any;
  }>;
  legendData: {
    [key: string]: any;
  };
  handleOptionEvent(key: any, data?: string): void;
  render(): any;
}
