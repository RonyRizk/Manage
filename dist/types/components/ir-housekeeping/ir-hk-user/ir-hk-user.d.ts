import { THKUser } from "../../../models/housekeeping";
import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrHkUser {
  user: THKUser | null;
  isEdit: boolean;
  isLoading: boolean;
  userInfo: THKUser;
  errors: {
    [P in keyof THKUser]?: any;
  } | null;
  resetData: EventEmitter<null>;
  closeSideBar: EventEmitter<null>;
  private housekeepingService;
  private default_properties;
  componentWillLoad(): Promise<void>;
  updateUserField(key: keyof THKUser, value: any): void;
  addUser(): Promise<void>;
  handleBlur(e: CustomEvent): Promise<void>;
  render(): any;
}
