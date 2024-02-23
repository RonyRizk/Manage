export declare class IrPopover {
  el: HTMLElement;
  popoverTitle: string;
  isHovered: boolean;
  showPopover: boolean;
  irPopoverLeft: string;
  componentWillLoad(): void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  checkTitleWidth(): void;
  render(): any;
}
