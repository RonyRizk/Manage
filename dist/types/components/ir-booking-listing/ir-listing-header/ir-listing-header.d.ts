export declare class IrListingHeader {
  propertyId: number;
  language: string;
  baseurl: string;
  inputValue: string;
  private bookingListingService;
  componentWillLoad(): void;
  handleDateRangeChange(e: CustomEvent): void;
  handleSearchClicked(): Promise<void>;
  render(): any;
}
