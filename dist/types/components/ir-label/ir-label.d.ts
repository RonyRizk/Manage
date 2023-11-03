import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrLabel {
  label: string;
  value: string;
  iconShown: boolean;
  imageSrc: string;
  editSidebar: EventEmitter;
  openEditSidebar(): void;
  render(): any;
}
