import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrUnitStatus {
  private housekeepingService;
  resetData: EventEmitter<null>;
  componentWillLoad(): void;
  handleSelectChange(e: CustomEvent): Promise<void>;
  render(): any;
}
