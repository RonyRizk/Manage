'use strict';

const moment = require('./moment-f96595e5.js');

function isBlockUnit(status_code) {
  return ['003', '002', '004'].includes(status_code);
}
function getCurrencySymbol(currencyCode) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(0).replace(/[0-9]/g, '').trim();
}
function renderTime(time) {
  return time < 10 ? time.toString().padStart(2, '0') : time.toString();
}
function formatAmount(currency, amount) {
  const symbol = getCurrencySymbol(currency);
  return symbol + amount.toFixed(2);
}

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
  // return moment(`${hour}:${minute}`, 'HH:mm').format('HH:mm');
};

exports._formatAmount = _formatAmount;
exports._formatDate = _formatDate;
exports._formatTime = _formatTime;
exports._getDay = _getDay;
exports.formatAmount = formatAmount;
exports.isBlockUnit = isBlockUnit;
exports.renderTime = renderTime;

//# sourceMappingURL=functions-b7566fca.js.map