export declare class RoomService {
  fetchData(id: number, language: string): Promise<{
    [key: string]: any;
  }>;
  fetchLanguage(code: string): Promise<{
    [key: string]: any;
  }>;
  private transformArrayToObject;
}
