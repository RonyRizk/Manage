import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrChannelHeader {
  el: HTMLElement;
  headerTitles: {
    id: string;
    name: string;
    disabled: boolean;
  }[];
  selectedIndex: number;
  tabChanged: EventEmitter<string>;
  private activeIndicator;
  private animationFrameId;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  handleTabSelection(index: number): void;
  updateActiveIndicator(): void;
  render(): any;
}
