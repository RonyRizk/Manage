import { h as hooks } from './moment-7d60e5ef.js';

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
  return hooks(date).format('MMM DD, YYYY');
};
const _formatAmount = (amount, currency = 'USD') => {
  // format the amount using accounting.js
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};
const _getDay = (date) => {
  // formate it as day number/month number and day name
  return hooks(date).format('DD/MM ddd');
};
const _formatTime = (hour, minute) => {
  // format them as AM/PM using moment.js
  return hooks(`${hour}:${minute}`, 'HH:mm').format('hh:mm A');
  // return moment(`${hour}:${minute}`, 'HH:mm').format('HH:mm');
};

export { _formatDate as _, _formatTime as a, _formatAmount as b, _getDay as c, formatAmount as f, isBlockUnit as i, renderTime as r };

//# sourceMappingURL=functions-3f3b79bf.js.map