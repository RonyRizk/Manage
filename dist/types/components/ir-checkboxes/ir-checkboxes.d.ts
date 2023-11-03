import { EventEmitter } from '../../stencil-public-runtime';
import { checkboxes } from '../../common/models';
export declare class IrCheckBoxes {
  checkboxes: checkboxes[];
  checkedCheckboxes: checkboxes[];
  checkboxesChange: EventEmitter<checkboxes[]>;
  handleCheckboxChange(event: any): void;
  componentWillLoad(): void;
  render(): any;
}
