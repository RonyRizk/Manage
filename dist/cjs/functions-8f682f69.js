'use strict';

const moment = require('./moment-f96595e5.js');

const _formatDate = (date) => {
  // Month Name 3 letters, Day, Year
  return moment.hooks(date).format('MMM DD, YYYY');
};
const _formatAmount = (amount, currency = 'USD') => {
  // format the amount using accounting.js
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};
const _getDay = (date) => {
  // formate it as day number/month number and day name
  return moment.hooks(date).format('DD/MM ddd');
};
const _formatTime = (hour, minute) => {
  // format them as AM/PM using moment.js
  return moment.hooks(`${hour}:${minute}`, 'HH:mm').format('hh:mm A');
};

exports._formatAmount = _formatAmount;
exports._formatDate = _formatDate;
exports._formatTime = _formatTime;
exports._getDay = _getDay;

//# sourceMappingURL=functions-8f682f69.js.map