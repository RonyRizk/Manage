import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrCheckBox {
  name: string;
  checked: boolean;
  label: string;
  disabled: boolean;
  value: string;
  labelPosition: 'before' | 'after';
  checkboxChange: EventEmitter<{
    name: string;
    value: string;
    checked: boolean;
  }>;
  handleInputChange: () => void;
  render(): any;
}
