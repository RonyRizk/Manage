import { T as Token, a as axios } from './axios-8e9c5680.js';
import { c as createStore } from './index-12cef0ac.js';

const initialValue = {
  default_properties: undefined,
  hk_criteria: undefined,
  hk_tasks: undefined,
  pending_housekeepers: [],
};
const { state: housekeeping_store } = createStore(initialValue);
function updateHKStore(key, value) {
  housekeeping_store[key] = value;
}
function getDefaultProperties() {
  return housekeeping_store.default_properties;
}

class HouseKeepingService extends Token {
  async getExposedHKSetup(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Get_Exposed_HK_Setup?Ticket=${token}`, {
      property_id,
    });
    updateHKStore('hk_criteria', data['My_Result']);
    return data['My_Result'];
  }
  async getExposedHKStatusCriteria(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Get_Exposed_HK_Status_Criteria?Ticket=${token}`, {
      property_id,
    });
    updateHKStore('hk_tasks', data['My_Result']);
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
  async manageExposedAssignedUnitToHKM(property_id, assignments) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Manage_Exposed_Assigned_Unit_To_HKM?Ticket=${token}`, {
      property_id,
      links: assignments,
    });
    return data['My_Result'];
  }
  async editExposedHKM(params, is_to_remove = false) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Edit_Exposed_HKM?Ticket=${token}`, Object.assign(Object.assign({}, params), { is_to_remove }));
    return data['My_Result'];
  }
  async getHKPendingActions(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Get_HK_Pending_Actions?Ticket=${token}`, Object.assign({}, params));
    updateHKStore('pending_housekeepers', [...data['My_Result']]);
    return data['My_Result'];
  }
  async executeHKAction(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    await axios.post(`/Execute_HK_Action?Ticket=${token}`, Object.assign({}, params));
  }
  async generateUserName(name) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await axios.post(`/Generate_UserName?Ticket=${token}`, { name });
    return data.My_Result;
  }
}

export { HouseKeepingService as H, getDefaultProperties as g, housekeeping_store as h, updateHKStore as u };

//# sourceMappingURL=housekeeping.service-e1fb3a5c.js.map