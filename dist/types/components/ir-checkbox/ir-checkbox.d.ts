import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrCheckbox {
  checked: boolean;
  label: string;
  checkboxId: string;
  name: string;
  disabled: boolean;
  currentChecked: boolean;
  checkChange: EventEmitter<boolean>;
  handleCheckedChange(newValue: boolean): void;
  private checkboxRef;
  componentWillLoad(): void;
  componentDidLoad(): void;
  handleCheckChange(): void;
  render(): any;
}
