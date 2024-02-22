import { Token } from "../models/Token";
export declare class RoomService extends Token {
  fetchData(id: number, language: string): Promise<any>;
  fetchLanguage(code: string, sections?: string[]): Promise<{
    entries: any;
    direction: any;
  }>;
  private transformArrayToObject;
}
