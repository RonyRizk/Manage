import { IChannel } from "../../models/calendarData";
import { TLocaleEntries } from "../../stores/locales.store";
export declare const actions: (entries: TLocaleEntries) => {
  id: string;
  name: string;
  icon: () => any;
  action: (params: IChannel) => void;
}[];
