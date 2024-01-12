import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrSidebar {
  name: string;
  side: 'right' | 'left';
  showCloseButton: boolean;
  open: boolean;
  sidebarStyles: Partial<CSSStyleDeclaration>;
  irSidebarToggle: EventEmitter;
  private sidebarRef;
  applyStyles(): void;
  handleSidebarStylesChange(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private handleKeyDown;
  disconnectedCallback(): void;
  toggleSidebar(): Promise<void>;
  render(): any[];
}
