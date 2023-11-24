import { EventEmitter } from '../../../stencil-public-runtime';
export declare class IrPaymentDetails {
  item: any;
  newTableRow: boolean;
  collapsedPayment: boolean;
  collapsedGuarantee: boolean;
  flag: boolean;
  confirmModal: boolean;
  toBeDeletedItem: any;
  paymentDetailsUrl: string;
  paymentExceptionMessage: string;
  handlePaymentItemChange: EventEmitter<any>;
  creditCardPressHandler: EventEmitter<any>;
  itemToBeAdded: any;
  _handleSave(): void;
  handleConfirmModal(e: any): void;
  wandler(): void;
  _renderTableRow(item: any, rowMode?: 'add' | 'normal'): any;
  bookingGuarantee(): any;
  _renderDueDate(item: any): any;
  render(): any[];
}
