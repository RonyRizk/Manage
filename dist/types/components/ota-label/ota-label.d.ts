import { IOtaNotes } from "../../models/booking.dto";
export declare class OtaLabel {
  label: string;
  remarks: IOtaNotes[];
  maxVisibleItems: number;
  showAll: boolean;
  toggleShowAll: () => void;
  render(): any;
}
