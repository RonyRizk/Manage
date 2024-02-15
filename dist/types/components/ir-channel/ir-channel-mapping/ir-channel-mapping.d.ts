import { IExposedChannel } from "../../../models/calendarData";
export declare class IrChannelMapping {
  selectedChannel: IExposedChannel;
  activeMapField: string;
  componentWillLoad(): void;
  render(): any;
}
