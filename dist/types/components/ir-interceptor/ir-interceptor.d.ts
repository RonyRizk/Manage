import { EventEmitter } from '../../stencil-public-runtime';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IToast } from '../ir-toast/toast';
export declare class IrInterceptor {
  isShown: boolean;
  isLoading: boolean;
  isUnassignedUnit: boolean;
  handledEndpoints: string[];
  toast: EventEmitter<IToast>;
  componentWillLoad(): void;
  setupAxiosInterceptors(): void;
  extractEndpoint(url: string): string;
  isHandledEndpoint(url: string): boolean;
  handleRequest(config: AxiosRequestConfig): AxiosRequestConfig<any>;
  handleResponse(response: AxiosResponse): AxiosResponse<any, any>;
  handleError(error: string): Promise<never>;
  render(): any;
}
