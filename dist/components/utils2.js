import './moment.js';

function isBlockUnit(status_code) {
  return ['003', '002', '004'].includes(status_code);
}
function renderTime(time) {
  return time < 10 ? time.toString().padStart(2, '0') : time.toString();
}

export { isBlockUnit as i, renderTime as r };

//# sourceMappingURL=utils2.js.map