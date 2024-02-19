export declare class RoomService {
  fetchData(id: number, language: string): Promise<any>;
  getExposedChannels(): Promise<any>;
  fetchLanguage(code: string): Promise<{
    entries: any;
    direction: any;
  }>;
  getExposedConnectedChannels(property_id: number): Promise<void>;
  private transformArrayToObject;
}
