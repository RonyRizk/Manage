import { IChannel } from "../../../models/calendarData";
export declare class IrChannelMapping {
  selectedChannel: IChannel;
  activeMapField: string;
  private mappingService;
  componentWillLoad(): void;
  renderMappingStatus(id: string): any;
  render(): any;
}
