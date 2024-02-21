import { IChannel } from "../../models/calendarData";
import { LocalizationStrings } from "../../stores/locales.store";
export declare const actions: (entries: LocalizationStrings) => {
  id: string;
  name: string;
  icon: () => any;
  action: (params: IChannel) => void;
}[];
