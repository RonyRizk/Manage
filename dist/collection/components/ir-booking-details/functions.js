import moment from "moment";
export const _formatDate = (date) => {
  // Month Name 3 letters, Day, Year
  return moment(date).format('MMM DD, YYYY');
};
export const _formatAmount = (amount, currency = 'USD') => {
  // format the amount using accounting.js
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};
export const _getDay = (date) => {
  // formate it as day number/month number and day name
  return moment(date).format('DD/MM ddd');
};
export const _formatTime = (hour, minute) => {
  // format them as AM/PM using moment.js
  return moment(`${hour}:${minute}`, 'HH:mm').format('hh:mm A');
};
//# sourceMappingURL=functions.js.map
