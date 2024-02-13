type EventCategories = {};
type EventInfo = {
  categories: EventCategories;
  dateStr: string;
};
type UnassignedDates = {
  [timestamp: string]: EventInfo;
};
declare let unassigned_dates: UnassignedDates;
export declare function addUnassingedDates(data: UnassignedDates): void;
export declare function getUnassignedDates(): UnassignedDates;
export declare function removeUnassignedDates(from_date: string, to_date: string): void;
export default unassigned_dates;
