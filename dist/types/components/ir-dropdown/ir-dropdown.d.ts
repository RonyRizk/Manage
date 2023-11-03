import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrDropdown {
  data: {
    name: string;
    icon: string;
    children: {
      name: string;
      icon: string;
    }[];
  };
  object: any;
  show: boolean;
  dropdownItemCLicked: EventEmitter<{
    name: string;
    object: any;
  }>;
  render(): any;
}
