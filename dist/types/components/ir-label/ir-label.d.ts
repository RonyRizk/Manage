import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrLabel {
  label: string;
  value: string;
  iconShown: boolean;
  imageSrc: string;
  country: boolean;
  imageStyle: string;
  editSidebar: EventEmitter;
  openEditSidebar(): void;
  render(): any;
}
