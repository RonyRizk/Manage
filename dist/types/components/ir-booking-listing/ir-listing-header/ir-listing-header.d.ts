export declare class IrListingHeader {
  propertyId: number;
  language: string;
  baseurl: string;
  inputValue: string;
  private bookingListingService;
  componentWillLoad(): void;
  private downloadUrlTag;
  handleDateRangeChange(e: CustomEvent): void;
  handleSearchClicked(is_to_export: boolean): Promise<void>;
  handleClearUserField(): Promise<void>;
  render(): any;
}
