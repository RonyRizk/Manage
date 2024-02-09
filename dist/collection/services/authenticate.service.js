import axios from "axios";
export class AuthService {
  constructor() {
    this.data = {
      username: null,
      password: null,
    };
  }
  async authenticate(baseurl, userName, password) {
    this.data = {
      username: userName,
      password: password,
    };
    axios.defaults.baseURL = baseurl;
    const { data } = await axios.post("/Authenticate", Object.assign({}, this.data));
    sessionStorage.setItem("token", JSON.stringify(data.My_Result));
  }
}
//# sourceMappingURL=authenticate.service.js.map
