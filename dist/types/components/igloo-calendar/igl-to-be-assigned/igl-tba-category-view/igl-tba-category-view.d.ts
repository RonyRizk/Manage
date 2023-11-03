import { EventEmitter } from "../../../../stencil-public-runtime";
export declare class IglTbaCategoryView {
  assignUnitEvent: EventEmitter<{
    [key: string]: any;
  }>;
  calendarData: {
    [key: string]: any;
  };
  selectedDate: any;
  categoriesData: {
    [key: string]: any;
  };
  categoryId: any;
  eventDatas: any;
  categoryIndex: any;
  renderAgain: boolean;
  componentWillLoad(): void;
  handleAssignRoomEvent(event: CustomEvent<{
    [key: string]: any;
  }>): void;
  getEventView(categoryId: any, eventDatas: any): any;
  renderView(): void;
  render(): any;
}
