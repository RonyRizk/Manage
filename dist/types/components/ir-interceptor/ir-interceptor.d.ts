import { EventEmitter } from '../../stencil-public-runtime';
import { IToast } from '../ir-toast/toast';
export declare class IrInterceptor {
  isShown: boolean;
  isLoading: boolean;
  isUnassignedUnit: boolean;
  defaultMessage: {
    loadingMessage: string;
    errorMessage: string;
  };
  handledEndpoints: string[];
  toast: EventEmitter<IToast>;
  componentWillLoad(): void;
  setupAxiosInterceptors(): void;
  extractEndpoint(url: string): string;
  isHandledEndpoint(url: string): boolean;
  handleRequest(config: any): any;
  handleResponse(response: any): any;
  handleError(error: any): Promise<never>;
  showToast(): void;
  hideToastAfterDelay(isSuccess: boolean): void;
  renderMessage(): string;
  render(): any;
}
