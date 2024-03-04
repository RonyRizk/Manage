import { Token } from "../../../src/models/Token";
import axios from "axios";
export class HouseKeepingService extends Token {
  async getExposedHKSetup(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Get_Exposed_HK_Setup?Ticket=${token}`, {
      property_id,
    });
    return data['My_Result'];
  }
  async setExposedInspectionMode(property_id, mode) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Set_Exposed_Inspection_Mode?Ticket=${token}`, {
      property_id,
      mode,
    });
    return data['My_Result'];
  }
}
//# sourceMappingURL=housekeeping.service.js.map
