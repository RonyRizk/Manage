import { h as hooks } from './moment.js';

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
};

export { _formatDate as _, _formatTime as a, _formatAmount as b, _getDay as c };

//# sourceMappingURL=functions.js.map