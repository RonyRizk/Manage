import { IToast } from "../../components";
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IrCombobox {
  data: {
    id: string;
    name: string;
  }[];
  duration: number;
  placeholder: string;
  value: string;
  disabled: boolean;
  autoFocus: boolean;
  input_id: string;
  selectedIndex: number;
  isComboBoxVisible: boolean;
  isLoading: boolean;
  isItemSelected: boolean;
  inputValue: string;
  filteredData: {
    id: string;
    name: string;
  }[];
  el: HTMLElement;
  comboboxValueChange: EventEmitter<{
    key: string;
    data: unknown;
  }>;
  inputCleared: EventEmitter<null>;
  toast: EventEmitter<IToast>;
  componentShouldAutoFocus: boolean;
  private inputRef;
  private debounceTimer;
  private blurTimout;
  componentWillLoad(): void;
  componentDidLoad(): void;
  watchHandler(newValue: boolean, oldValue: boolean): void;
  handleKeyDown(event: KeyboardEvent): void;
  getHeightOfPElement(): number;
  focusInput(): void;
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
  renderDropdown(): any;
  handleSubmit(e: Event): void;
  render(): any;
}
