import { EventEmitter } from '../../../../stencil-public-runtime';
import { TPropertyButtonsTypes } from '../../../../models/igl-book-property';
export declare class IglBookPropertyFooter {
  eventType: string;
  disabled: boolean;
  buttonClicked: EventEmitter<{
    key: TPropertyButtonsTypes;
  }>;
  private isEventType;
  private renderButton;
  private shouldRenderTwoButtons;
  render(): any;
}
