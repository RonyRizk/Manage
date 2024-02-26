export declare class IrChannelGeneral {
  channel_status: 'create' | 'edit' | null;
  buttonClicked: boolean;
  connection_status_message: string;
  status: boolean;
  componentWillLoad(): void;
  handleTestConnectionClicked(e: Event): void;
  render(): any;
}
