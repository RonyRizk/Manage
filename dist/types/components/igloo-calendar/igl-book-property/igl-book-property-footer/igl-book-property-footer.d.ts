import { EventEmitter } from '../../../../stencil-public-runtime';
import { TPropertyButtonsTypes } from '../../../../models/igl-book-property';
export declare class IglBookPropertyFooter {
  eventType: string;
  disabled: boolean;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
  }>;
  private isEventType;
  editNext(label: any): "flex-fill" | "d-none d-md-block  flex-fill";
  private renderButton;
  private shouldRenderTwoButtons;
  render(): any;
}
