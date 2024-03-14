import { IHouseKeepers, THousekeepingTrigger } from "../../../models/housekeeping";
export declare class IrHkTeam {
  el: HTMLElement;
  currentTrigger: THousekeepingTrigger | null;
  private deletionTimout;
  renderAssignedUnits(hk: IHouseKeepers): any;
  renderCurrentTrigger(): any;
  handleCloseSideBar(e: CustomEvent): void;
  handleDeletion(user: any): void;
  disconnectedCallback(): void;
  render(): any;
}
