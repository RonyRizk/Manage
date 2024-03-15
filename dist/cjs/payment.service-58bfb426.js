'use strict';

const Token = require('./Token-7fd57fe8.js');

class PaymentService extends Token.Token {
  async AddPayment(payment, book_nbr) {
    try {
      const token = this.getToken();
      if (token !== null) {
        const { data } = await Token.axios.post(`/Do_Payment?Ticket=${token}`, { payment: Object.assign(Object.assign({}, payment), { book_nbr }) });
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
        const { data } = await Token.axios.post(`/Cancel_Payment?Ticket=${token}`, { id });
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

//# sourceMappingURL=payment.service-58bfb426.js.map