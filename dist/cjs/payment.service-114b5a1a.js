'use strict';

const axios = require('./axios-77201e24.js');

class PaymentService extends axios.Token {
  async AddPayment(payment, book_nbr) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.axios.post(`/Do_Payment?Ticket=${token}`, { payment: Object.assign(Object.assign({}, payment), { book_nbr }) });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async CancelPayment(id) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await axios.axios.post(`/Cancel_Payment?Ticket=${token}`, { id });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

exports.PaymentService = PaymentService;

//# sourceMappingURL=payment.service-114b5a1a.js.map