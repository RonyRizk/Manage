import axios from "axios";
export class RoomService {
  async fetchData(id, language) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      if (token !== null) {
        const { data } = await axios.post(`/Get_Exposed_Property?Ticket=${token}`, { id, language });
        if (data.ExceptionMsg !== "") {
          throw new Error(data.ExceptionMsg);
        }
        return data;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
//# sourceMappingURL=room.service.js.map
