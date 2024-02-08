import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrButton {
  name: string;
  text: any;
  icon: string;
  btn_color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size: 'sm' | 'md' | 'lg';
  textSize: 'sm' | 'md' | 'lg';
  btn_block: boolean;
  btn_disabled: boolean;
  btn_type: string;
  isLoading: boolean;
  btn_styles: string;
  connectedCallback(): void;
  disconnectedCallback(): void;
  clickHanlder: EventEmitter<any>;
  render(): any;
}
