import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrSwitch {
  checked: boolean;
  switchId: string;
  disabled: boolean;
  checkChange: EventEmitter<boolean>;
  private switchRoot;
  private _id;
  componentWillLoad(): void;
  componentDidLoad(): void;
  generateRandomId(length: number): string;
  handleCheckChange(): void;
  render(): any;
}
