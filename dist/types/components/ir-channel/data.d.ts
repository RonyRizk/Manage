import { IChannel } from "../../models/calendarData";
import { LocalizationChannelFrontEntries, LocalizationStrings } from "../../stores/locales.store";
export declare const actions: (entries: LocalizationStrings & LocalizationChannelFrontEntries) => {
  id: string;
  name: string;
  icon: () => any;
  action: (params: IChannel) => void;
}[];
