export declare class RoomService {
  private token;
  constructor();
  fetchData(id: number, language: string): Promise<any>;
  getExposedChannels(): Promise<any>;
  fetchLanguage(code: string): Promise<{
    entries: any;
    direction: any;
  }>;
  private transformArrayToObject;
}
