export declare class RoomService {
  fetchData(id: number, language: string): Promise<{
    [key: string]: any;
  }>;
  fetchLanguage(code: string): Promise<{
    entries: any;
    direction: any;
  }>;
  private transformArrayToObject;
}
