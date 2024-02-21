'use strict';

require('./moment-f96595e5.js');

function isBlockUnit(status_code) {
  return ['003', '002', '004'].includes(status_code);
}
function renderTime(time) {
  return time < 10 ? time.toString().padStart(2, '0') : time.toString();
}

exports.isBlockUnit = isBlockUnit;
exports.renderTime = renderTime;

//# sourceMappingURL=utils-2022a43a.js.map