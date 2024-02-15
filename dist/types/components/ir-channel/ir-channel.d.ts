export declare class IrChannel {
  el: HTMLElement;
  ticket: string;
  propertyid: number;
  language: string;
  baseurl: string;
  channel_status: 'create' | 'edit' | null;
  private roomService;
  componentWillLoad(): void;
  initializeApp(): Promise<void>;
  ticketChanged(): Promise<void>;
  render(): any;
}
