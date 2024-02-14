import { IToast } from "../../components";
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrCombobox {
  data: {
    id: number;
    name: string;
  }[];
  duration: number;
  selectedIndex: number;
  isComboBoxVisible: boolean;
  isLoading: boolean;
  isItemSelected: boolean;
  inputValue: string;
  el: HTMLElement;
  comboboxValue: EventEmitter<{
    key: string;
    data: unknown;
  }>;
  inputCleared: EventEmitter<null>;
  toast: EventEmitter<IToast>;
  private inputRef;
  private debounceTimer;
  handleKeyDown(event: KeyboardEvent): void;
  getHeightOfPElement(): number;
  adjustScrollPosition(itemHeight: any, visibleHeight?: number): void;
  selectItem(index: any): void;
  debounceFetchData(): void;
  handleFocus(): void;
  clearInput(): void;
  resetCombobox(withblur?: boolean): void;
  fetchData(): Promise<void>;
  handleInputChange(event: Event): void;
  handleDocumentClick(event: MouseEvent): void;
  handleBlur(): void;
  isDropdownItem(element: any): any;
  disconnectedCallback(): void;
  handleItemKeyDown(event: KeyboardEvent, index: number): void;
  render(): any;
}
