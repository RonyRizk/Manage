export type TIrInterceptorStatus = 'pending' | 'done' | null;
export interface IRequestStatus {
  [key: string]: TIrInterceptorStatus;
}
export declare const interceptor_requests: IRequestStatus, onCalendarDatesChange: import("@stencil/store/dist/types").OnChangeHandler<IRequestStatus>;
export declare function isRequestPending(url: string): boolean;
export default interceptor_requests;
