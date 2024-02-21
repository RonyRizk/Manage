export declare class RoomService {
  fetchData(id: number, language: string): Promise<any>;
  fetchLanguage(code: string, sections?: string[]): Promise<{
    entries: any;
    direction: any;
  }>;
  private transformArrayToObject;
}
