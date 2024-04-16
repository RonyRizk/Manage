'use strict';

const Token = require('./Token-7fd57fe8.js');
const index = require('./index-797ee4c0.js');

const initialValue = {
  default_properties: undefined,
  hk_criteria: undefined,
  hk_tasks: undefined,
  pending_housekeepers: [],
};
const { state: housekeeping_store } = index.createStore(initialValue);
function updateHKStore(key, value) {
  housekeeping_store[key] = value;
}
function getDefaultProperties() {
  return housekeeping_store.default_properties;
}

class HouseKeepingService extends Token.Token {
  async getExposedHKSetup(property_id) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await Token.axios.post(`/Get_Exposed_HK_Setup?Ticket=${token}`, {
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
    const { data } = await Token.axios.post(`/Get_Exposed_HK_Status_Criteria?Ticket=${token}`, {
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
    const { data } = await Token.axios.post(`/Set_Exposed_Inspection_Mode?Ticket=${token}`, {
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
    const { data } = await Token.axios.post(`/Manage_Exposed_Assigned_Unit_To_HKM?Ticket=${token}`, {
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
    const { data } = await Token.axios.post(`/Edit_Exposed_HKM?Ticket=${token}`, Object.assign(Object.assign({}, params), { is_to_remove }));
    return data['My_Result'];
  }
  async getHKPendingActions(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await Token.axios.post(`/Get_HK_Pending_Actions?Ticket=${token}`, Object.assign({}, params));
    updateHKStore('pending_housekeepers', [...data['My_Result']]);
    return data['My_Result'];
  }
  async executeHKAction(params) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    await Token.axios.post(`/Execute_HK_Action?Ticket=${token}`, Object.assign({}, params));
  }
  async generateUserName(name) {
    const token = this.getToken();
    if (!token) {
      throw new Error('Missing token');
    }
    const { data } = await Token.axios.post(`/Generate_UserName?Ticket=${token}`, { name });
    return data.My_Result;
  }
}

exports.HouseKeepingService = HouseKeepingService;
exports.getDefaultProperties = getDefaultProperties;
exports.housekeeping_store = housekeeping_store;
exports.updateHKStore = updateHKStore;

//# sourceMappingURL=housekeeping.service-8abdb383.js.map