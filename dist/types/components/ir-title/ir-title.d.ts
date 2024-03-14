import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrTitle {
  label: string;
  displayContext: 'default' | 'sidebar';
  justifyContent: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'normal' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'safe center' | 'unsafe center';
  closeSideBar: EventEmitter<null>;
  el: HTMLElement;
  componentDidLoad(): void;
  handleJustifyContentChange(newValue: string, oldValue: string): void;
  render(): any;
}
