'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-94e5c77d.js');
const booking_service$1 = require('./booking.service-2b7878e62.js');
const booking = require('./booking-fd824007.js');
const utils$1 = require('./utils-8602f26d.js');
const moment = require('./moment-f96595e5.js');
const axios = require('./axios-77201e24.js');
const booking_service = require('./booking.service-2b7878e6.js');
const utils = require('./utils-6a5b3cb5.js');
const locales_store = require('./locales.store-8fed15eb.js');
const calendarData = require('./calendar-data-0a2c60be.js');
const events_service = require('./events.service-c099425e.js');
require('./booking-e82fa669.js');
require('./index-797ee4c0.js');

class EventsService extends axios.Token {
  constructor() {
    super(...arguments);
    this.bookingService = new booking_service.BookingService();
  }
  async reallocateEvent(pool, destination_pr_id, from_date, to_date) {
    try {
      const token = this.getToken();
      if (token) {
        console.log(pool, destination_pr_id, from_date, to_date);
        const { data } = await axios.axios.post(`/ReAllocate_Exposed_Room?Ticket=${token}`, { pool, destination_pr_id, from_date, to_date });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        console.log(data);
        return data;
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  async deleteEvent(POOL) {
    try {
      const token = this.getToken();
      if (token) {
        const { data } = await axios.axios.post(`/UnBlock_Exposed_Unit?Ticket=${token}`, {
          POOL,
        });
        if (data.ExceptionMsg !== '') {
          throw new Error(data.ExceptionMsg);
        }
        return data.My_Result;
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateBlockedEvent(bookingEvent) {
    try {
      const token = this.getToken();
      if (token) {
        const releaseData = utils.getReleaseHoursString(+bookingEvent.RELEASE_AFTER_HOURS);
        await this.deleteEvent(bookingEvent.POOL);
        this.bookingService.setToken(token);
        const result = await this.bookingService.blockUnit(Object.assign({ from_date: this.formatDate(bookingEvent.FROM_DATE), to_date: this.formatDate(bookingEvent.TO_DATE), pr_id: bookingEvent.PR_ID, STAY_STATUS_CODE: bookingEvent.OUT_OF_SERVICE ? '004' : bookingEvent.RELEASE_AFTER_HOURS === 0 ? '002' : '003', DESCRIPTION: bookingEvent.RELEASE_AFTER_HOURS || '', NOTES: bookingEvent.OPTIONAL_REASON || '' }, releaseData));
        return result;
      }
      else {
        throw new Error('Invalid Token');
      }
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  formatDate(date) {
    return date.split('/').join('-');
  }
}

const iglBookingEventCss = ".sc-igl-booking-event-h{display:block;position:absolute}.bookingEventBase.sc-igl-booking-event{position:absolute;background-color:rgb(49, 190, 241);width:100%;height:100%;transform:skewX(-22deg);border-radius:4px}.bookingEvent.sc-igl-booking-event{cursor:pointer}.bookingEventBase.sc-igl-booking-event{cursor:pointer}.bookingEventHiddenBase.sc-igl-booking-event{position:absolute;top:0;left:-4px;width:calc(100% + 8)}.bookingEventDragHandle.sc-igl-booking-event{position:absolute;top:0;width:15px;height:100%;opacity:0.1;background-color:rgba(0, 0, 0, 0.15);transform:skewX(-22deg);border-radius:4px;cursor:pointer}.splitBooking.sc-igl-booking-event{border-right:2px solid #000000}.sc-igl-booking-event-h:hover .bookingEventDragHandle.sc-igl-booking-event{display:block;opacity:1}.newEvent.sc-igl-booking-event-h:hover .bookingEventDragHandle.sc-igl-booking-event{display:none;opacity:1}.leftSide.sc-igl-booking-event{left:0}.rightSide.sc-igl-booking-event{right:0}.bookingEventTitle.sc-igl-booking-event{color:#fff;font-size:0.8em;position:relative;max-width:calc(100% - 10px);overflow:hidden;text-overflow:ellipsis;top:2px;left:5px;-webkit-user-select:none;user-select:none;-webkit-user-drag:none;cursor:pointer}.legend_circle.sc-igl-booking-event{border-radius:100%;width:10px;height:10px;margin:3px 3px 3px 2px;border:1px solid #fff}.noteIcon.sc-igl-booking-event{position:absolute;bottom:-8px;left:2px}.balanceIcon.sc-igl-booking-event{position:absolute;top:-8px;right:2px}";

var __rest = (undefined && undefined.__rest) || function (s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const IglBookingEvent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hideBubbleInfo = index.createEvent(this, "hideBubbleInfo", 7);
    this.updateEventData = index.createEvent(this, "updateEventData", 7);
    this.dragOverEventData = index.createEvent(this, "dragOverEventData", 7);
    this.showRoomNightsDialog = index.createEvent(this, "showRoomNightsDialog", 7);
    this.showDialog = index.createEvent(this, "showDialog", 7);
    this.resetStreachedBooking = index.createEvent(this, "resetStreachedBooking", 7);
    this.toast = index.createEvent(this, "toast", 7);
    this.dayWidth = 0;
    this.eventSpace = 8;
    this.vertSpace = 10;
    /* show bubble */
    this.showInfoPopup = false;
    this.bubbleInfoTopSide = false;
    this.isStreatch = false;
    /*Services */
    this.eventsService = new EventsService();
    this.bookingService = new booking_service$1.BookingService();
    /* Resize props */
    this.resizeSide = '';
    this.isDragging = false;
    this.animationFrameId = null;
    this.handleMouseMoveBind = this.handleMouseMove.bind(this);
    this.handleMouseUpBind = this.handleMouseUp.bind(this);
    this.handleClickOutsideBind = this.handleClickOutside.bind(this);
    this.currency = undefined;
    this.is_vacation_rental = false;
    this.language = undefined;
    this.bookingEvent = undefined;
    this.allBookingEvents = [];
    this.countryNodeList = undefined;
    this.renderElement = false;
    this.position = undefined;
    this.isShrinking = null;
  }
  componentWillLoad() {
    this.bookingService.setToken(calendarData.calendar_data.token);
    this.eventsService.setToken(calendarData.calendar_data.token);
    window.addEventListener('click', this.handleClickOutsideBind);
  }
  async fetchAndAssignBookingData() {
    try {
      console.log('clicked on book#', this.bookingEvent.BOOKING_NUMBER);
      if (['IN-HOUSE', 'CONFIRMED', 'PENDING-CONFIRMATION', 'CHECKED-OUT'].includes(this.bookingEvent.STATUS)) {
        const data = await this.bookingService.getExposedBooking(this.bookingEvent.BOOKING_NUMBER, 'en');
        let dataForTransformation = data.rooms.filter(d => d['assigned_units_pool'] === this.bookingEvent.ID);
        data.rooms = dataForTransformation;
        if (data.rooms.length === 0) {
          throw new Error(`"booking#${this.bookingEvent.BOOKING_NUMBER} have empty array"`);
        }
        else {
          if (data.rooms.some(r => r['assigned_units_pool'] === null)) {
            throw new Error(`"booking#${this.bookingEvent.BOOKING_NUMBER} have empty pool"`);
          }
        }
        const _a = booking.transformNewBooking(data)[0], others = __rest(_a, ["ID", "TO_DATE", "FROM_DATE", "NO_OF_DAYS", "STATUS", "NAME", "IDENTIFIER", "PR_ID", "POOL", "BOOKING_NUMBER", "NOTES", "is_direct", "BALANCE"]);
        this.bookingEvent = Object.assign(Object.assign({}, this.bookingEvent), others);
        this.showEventInfo(true);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  componentDidLoad() {
    if (this.isNewEvent()) {
      if (!this.bookingEvent.hideBubble) {
        /* auto matically open the popup, calling the method shows bubble either top or bottom based on available space. */
        setTimeout(async () => {
          if (['003', '002', '004'].includes(this.bookingEvent.STATUS_CODE)) {
            this.showEventInfo(true);
          }
          else if (['IN-HOUSE', 'CONFIRMED', 'PENDING-CONFIRMATION', 'CHECKED-OUT'].includes(this.bookingEvent.STATUS)) {
            await this.fetchAndAssignBookingData();
          }
          else {
            this.showEventInfo(true);
          }
          this.renderAgain();
        }, 1);
      }
    }
  }
  disconnectedCallback() {
    window.removeEventListener('click', this.handleClickOutsideBind);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  handleClickOutside(event) {
    const clickedElement = event.target;
    // Check if the clicked element is not within the target div
    if (!this.element.contains(clickedElement)) {
      // The click occurred outside the target div
      this.showEventInfo(false);
    }
  }
  hideBubbleInfoPopup(event) {
    if (event.detail.currentInfoBubbleId != this.getBookingId() || (event.detail.key === 'hidebubble' && event.detail.currentInfoBubbleId === this.getBookingId())) {
      this.showInfoPopup = false;
      this.renderAgain();
    }
  }
  async moveBookingToHandler(event) {
    try {
      if (event.detail.bookingId !== this.getBookingId()) {
        this.showEventInfo(false);
        return;
      }
      if (event.detail.moveToDay === 'revert' || event.detail.toRoomId === 'revert') {
        event.detail.moveToDay = this.bookingEvent.FROM_DATE;
        event.detail.toRoomId = event.detail.fromRoomId;
        if (this.isTouchStart && this.moveDiffereneX <= 5 && this.moveDiffereneY <= 5 && !this.isStreatch) {
          if (utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE)) {
            this.showEventInfo(true);
          }
          else if (['IN-HOUSE', 'CONFIRMED', 'PENDING-CONFIRMATION', 'CHECKED-OUT'].includes(this.bookingEvent.STATUS)) {
            await this.fetchAndAssignBookingData();
          }
        }
        else {
          this.animationFrameId = requestAnimationFrame(() => {
            this.resetBookingToInitialPosition();
          });
          return;
        }
      }
      else {
        if (this.isTouchStart && this.moveDiffereneX <= 5 && this.moveDiffereneY <= 5 && !this.isStreatch) {
          if (utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE)) {
            this.showEventInfo(true);
          }
          else if (['IN-HOUSE', 'CONFIRMED', 'PENDING-CONFIRMATION', 'CHECKED-OUT'].includes(this.bookingEvent.STATUS)) {
            await this.fetchAndAssignBookingData();
          }
        }
        else {
          const { pool, to_date, from_date, toRoomId } = event.detail;
          if (this.checkIfSlotOccupied(toRoomId, from_date, to_date)) {
            this.animationFrameId = requestAnimationFrame(() => {
              this.resetBookingToInitialPosition();
            });
            throw new Error('Overlapping Dates');
          }
          if (pool) {
            if (utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE)) {
              await this.eventsService.reallocateEvent(pool, toRoomId, from_date, to_date).catch(() => {
                this.resetBookingToInitialPosition();
              });
            }
            else {
              if (this.isShrinking || !this.isStreatch) {
                console.log(this.bookingEvent.PR_ID.toString() === toRoomId.toString(), this.bookingEvent.PR_ID.toString(), toRoomId.toString());
                try {
                  if (this.bookingEvent.PR_ID.toString() === toRoomId.toString()) {
                    await this.eventsService.reallocateEvent(pool, toRoomId, from_date, to_date);
                    return;
                  }
                }
                catch (error) {
                  this.resetBookingToInitialPosition();
                  return;
                }
                const { description, status } = this.setModalDescription(toRoomId, from_date, to_date);
                let hideConfirmButton = false;
                if (status === '400') {
                  hideConfirmButton = true;
                }
                this.showDialog.emit(Object.assign(Object.assign({}, event.detail), { description, title: '', hideConfirmButton }));
              }
              else {
                // if (this.checkIfSlotOccupied(toRoomId, from_date, to_date)) {
                //   this.animationFrameId = requestAnimationFrame(() => {
                //     this.resetBookingToInitialPosition();
                //   });
                //   throw new Error('Overlapping Dates');
                // } else {
                this.showRoomNightsDialog.emit({ bookingNumber: this.bookingEvent.BOOKING_NUMBER, identifier: this.bookingEvent.IDENTIFIER, to_date, pool, from_date });
                // }
              }
            }
            this.isShrinking = null;
          }
        }
      }
    }
    catch (error) {
      this.toast.emit({
        position: 'top-right',
        title: error.message,
        description: '',
        type: 'error',
      });
      console.log('something went wrong');
    }
  }
  setModalDescription(toRoomId, from_date, to_date) {
    const findRoomType = (roomId) => {
      let roomType = this.bookingEvent.roomsInfo.filter(room => room.physicalrooms.some(r => r.id === +roomId));
      if (roomType.length) {
        return roomType[0].id;
      }
      return null;
    };
    if (!this.bookingEvent.is_direct) {
      if (this.isShrinking) {
        return {
          description: `${locales_store.locales.entries.Lcz_YouWillLoseFutureUpdates}.`,
          status: '200',
        };
      }
      else {
        if (moment.hooks(from_date, 'YYYY-MM-DD').isSame(moment.hooks(this.bookingEvent.FROM_DATE, 'YYYY-MM-DD')) &&
          moment.hooks(to_date, 'YYYY-MM-DD').isSame(moment.hooks(this.bookingEvent.TO_DATE, 'YYYY-MM-DD'))) {
          const initialRT = findRoomType(this.bookingEvent.PR_ID);
          const targetRT = findRoomType(toRoomId);
          if (initialRT === targetRT) {
            return { description: `${locales_store.locales.entries.Lcz_AreYouSureWantToMoveAnotherUnit}?`, status: '200' };
          }
          else {
            return {
              description: `${locales_store.locales.entries.Lcz_YouWillLoseFutureUpdates} ${this.bookingEvent.origin ? this.bookingEvent.origin.Label : ''}. ${locales_store.locales.entries.Lcz_SameRatesWillBeKept}`,
              status: '200',
            };
          }
        }
        return { description: locales_store.locales.entries.Lcz_CannotChangeCHBookings, status: '400' };
      }
    }
    else {
      if (!this.isShrinking) {
        const initialRT = findRoomType(this.bookingEvent.PR_ID);
        const targetRT = findRoomType(toRoomId);
        if (initialRT === targetRT) {
          console.log('same rt');
          return { description: `${locales_store.locales.entries.Lcz_AreYouSureWantToMoveAnotherUnit}?`, status: '200' };
        }
        else {
          return {
            description: locales_store.locales.entries.Lcz_SameRatesWillBeKept,
            status: '200',
          };
        }
      }
      return { description: locales_store.locales.entries.Lcz_BalanceWillBeCalculated, status: '200' };
    }
  }
  resetBookingToInitialPosition() {
    if (this.isStreatch) {
      this.element.style.left = `${this.initialLeft}px`;
      this.element.style.width = `${this.initialWidth}px`;
      this.isStreatch = false;
      this.finalWidth = this.initialWidth;
      this.isShrinking = null;
    }
    else {
      this.element.style.top = `${this.dragInitPos.top}px`;
      this.element.style.left = `${this.dragInitPos.left}px`;
    }
  }
  handleRevertBooking(event) {
    if (this.bookingEvent.POOL === event.detail) {
      this.resetBookingToInitialPosition();
    }
  }
  checkIfSlotOccupied(toRoomId, from_date, to_date) {
    const fromTime = moment.hooks(from_date, 'YYYY-MM-DD');
    const toTime = moment.hooks(to_date, 'YYYY-MM-DD');
    const isOccupied = this.allBookingEvents.some(event => {
      if (event.POOL === this.bookingEvent.POOL) {
        return false;
      }
      const eventFromTime = moment.hooks(event.FROM_DATE, 'YYYY-MM-DD').add(1, 'days');
      const eventToTime = moment.hooks(event.TO_DATE, 'YYYY-MM-DD');
      return event.PR_ID === +toRoomId && toTime.isSameOrAfter(eventFromTime) && fromTime.isBefore(eventToTime);
    });
    return isOccupied;
  }
  renderAgain() {
    this.renderElement = !this.renderElement;
  }
  getUniqueId() {
    return new Date().getTime();
  }
  isSplitBooking() {
    return !!this.bookingEvent.SPLIT_BOOKING;
  }
  isNewEvent() {
    return this.getBookingId() === 'NEW_TEMP_EVENT';
  }
  isHighlightEventType() {
    return this.getEventType() === 'HIGH_LIGHT';
  }
  getBookingId() {
    return this.bookingEvent.ID;
  }
  getBookingStatus() {
    return this.bookingEvent.STATUS;
  }
  getBookedBy() {
    return this.bookingEvent.NAME;
  }
  getBookedRoomId() {
    return this.bookingEvent.PR_ID;
  }
  getEventStartingDate() {
    return new Date(this.bookingEvent.FROM_DATE);
  }
  getEventEndingDate() {
    return new Date(this.bookingEvent.TO_DATE);
  }
  getEventType() {
    return this.bookingEvent.event_type;
  }
  getEventLegend() {
    var _a, _b;
    // console.log(this.getBookingStatus());
    let status = (_a = this.bookingEvent) === null || _a === void 0 ? void 0 : _a.legendData.statusId[this.getBookingStatus()];
    let orderRide = this.isNewEvent() ? { color: '#f9f9c9' } : {};
    return Object.assign(Object.assign(Object.assign({}, (_b = this.bookingEvent) === null || _b === void 0 ? void 0 : _b.legendData[status.id]), status), orderRide);
  }
  getLegendOfStatus(aStatusId) {
    var _a;
    // console.log(aStatusId);
    let status = (_a = this.bookingEvent) === null || _a === void 0 ? void 0 : _a.legendData.statusId[aStatusId];
    return Object.assign(Object.assign({}, this.bookingEvent.legendData[status.id]), status);
  }
  getNoteNode() {
    if (this.bookingEvent.NOTES || this.bookingEvent.INTERNAL_NOTE) {
      return this.getLegendOfStatus('NOTES');
    }
    return null;
  }
  getBalanceNode() {
    if (this.bookingEvent.BALANCE !== null && this.bookingEvent.BALANCE >= 1) {
      return this.getLegendOfStatus('OUTSTANDING-BALANCE');
    }
    return null;
  }
  setStayDays(aStayDays) {
    this.bookingEvent.NO_OF_DAYS = aStayDays;
    this.renderAgain();
    // this.updateData({id: this.getBookedRoomId(), data: { NO_OF_DAYS: aStayDays }});
  }
  getStayDays() {
    return this.bookingEvent.NO_OF_DAYS;
  }
  getPosition() {
    let startingDate = this.getEventStartingDate();
    let startingCellClass = '.room_' + this.getBookedRoomId() + '_' + startingDate.getDate() + '_' + (startingDate.getMonth() + 1) + '_' + startingDate.getFullYear();
    let bodyContainer = document.querySelector('.bodyContainer');
    let startingCell = document.querySelector(startingCellClass);
    let pos = { top: '0', left: '0', width: '0', height: '20px' };
    if (startingCell && bodyContainer && startingCell.getBoundingClientRect() && bodyContainer.getBoundingClientRect()) {
      let bodyContainerRect = bodyContainer.getBoundingClientRect();
      let boundingRect = startingCell.getBoundingClientRect();
      this.dayWidth = this.dayWidth || boundingRect.width;
      pos.top = boundingRect.top + boundingRect.height / 2 - this.vertSpace - bodyContainerRect.top + 'px';
      pos.left = boundingRect.left + this.dayWidth / 2 + this.eventSpace / 2 - bodyContainerRect.left + 'px';
      pos.width = this.getStayDays() * this.dayWidth - this.eventSpace + 'px';
    }
    else {
      console.log(this.bookingEvent);
      console.log('Locating event cell failed ', startingCellClass);
    }
    //console.log(pos);
    return pos;
  }
  getNumber(aData) {
    return aData ? parseFloat(aData) : 0;
  }
  startDragging(event, side) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (this.isNewEvent() || this.isHighlightEventType()) {
      return null;
    }
    this.resizeSide = side;
    this.isDragging = true;
    this.showEventInfo(false); // Hide bubble;
    this.isStreatch = side !== 'move';
    if (side === 'move') {
      this.initialX = event.clientX || event.touches[0].clientX;
      this.initialY = event.clientY || event.touches[0].clientY;
      this.elementRect = this.element.getBoundingClientRect();
      const offsetX = 0; //this.initialX - this.elementRect.left - 18;
      const offsetY = 0; // this.initialY - this.elementRect.top - (this.elementRect.height/2);
      this.dragInitPos = {
        id: this.getBookingId(),
        fromRoomId: this.getBookedRoomId(),
        top: this.getNumber(this.element.style.top) + offsetY,
        left: this.getNumber(this.element.style.left) + offsetX,
      };
      this.dragInitPos.x = this.dragInitPos.left; // + 18;
      this.dragInitPos.y = this.dragInitPos.top; // + (this.elementRect.height/2);
      this.dragEndPos = Object.assign({}, this.dragInitPos);
      this.element.style.top = `${this.dragInitPos.top}px`;
      this.element.style.left = `${this.dragInitPos.left}px`;
      this.isTouchStart = true; // !!(event.touches && event.touches.length);
      this.dragOverEventData.emit({
        id: 'CALCULATE_DRAG_OVER_BOUNDS',
        data: this.dragInitPos,
      });
    }
    else {
      this.initialWidth = this.element.offsetWidth;
      this.initialLeft = this.element.offsetLeft;
      this.initialX = event.clientX || event.touches[0].clientX;
      this.dragOverEventData.emit({
        id: 'CALCULATE_DRAG_OVER_BOUNDS',
        data: {
          id: this.getBookingId(),
          fromRoomId: this.getBookedRoomId(),
          top: this.getNumber(this.element.style.top),
          left: this.initialLeft,
          x: this.initialX,
          y: event.clientY || event.touches[0].clientY,
        },
      });
    }
    document.addEventListener('mousemove', this.handleMouseMoveBind);
    document.addEventListener('touchmove', this.handleMouseMoveBind);
    document.addEventListener('pointermove', this.handleMouseMoveBind);
    document.addEventListener('mouseup', this.handleMouseUpBind);
    document.addEventListener('touchup', this.handleMouseUpBind);
    document.addEventListener('pointerup', this.handleMouseUpBind);
  }
  handleMouseMove(event) {
    if (this.isDragging) {
      this.currentX = event.clientX || event.touches[0].clientX;
      let distanceX = this.currentX - this.initialX;
      if (this.resizeSide === 'move') {
        this.currentY = event.clientY || event.touches[0].clientY;
        let distanceY = this.currentY - this.initialY;
        this.element.style.top = `${this.dragInitPos.top + distanceY}px`;
        this.element.style.left = `${this.dragInitPos.left + distanceX}px`;
        this.dragEndPos = {
          id: this.getBookingId(),
          fromRoomId: this.getBookedRoomId(),
          top: this.dragInitPos.top + distanceY,
          left: this.dragInitPos.left + distanceX,
        };
        this.dragEndPos.x = this.dragEndPos.left; // + 18;
        this.dragEndPos.y = this.dragEndPos.top; // + (this.elementRect.height/2);
        this.dragOverEventData.emit({ id: 'DRAG_OVER', data: this.dragEndPos });
      }
      else {
        if (!this.bookingEvent.is_direct && !utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE)) {
          return;
        }
        let newWidth = this.initialWidth;
        if (this.resizeSide == 'rightSide') {
          newWidth = this.initialWidth + distanceX;
          newWidth = Math.min(newWidth, this.initialX + this.element.offsetWidth);
          newWidth = Math.max(this.dayWidth - this.eventSpace, newWidth);
          this.element.style.width = `${newWidth}px`;
          this.isShrinking = distanceX < 0;
        }
        else if (this.resizeSide == 'leftSide') {
          this.isShrinking = distanceX > 0;
          newWidth = Math.max(this.dayWidth - this.eventSpace, this.initialWidth - distanceX);
          let newLeft = this.initialLeft + (this.initialWidth - newWidth);
          this.element.style.left = `${newLeft}px`;
          this.element.style.width = `${newWidth}px`;
        }
        this.finalWidth = newWidth;
      }
    }
    else {
      console.log('still mouse move listening...');
    }
  }
  handleMouseUp() {
    if (this.isDragging) {
      if (this.resizeSide === 'move') {
        // console.log("Initial X::"+this.dragInitPos.x);
        // console.log("Initial Y::"+this.dragInitPos.y);
        // console.log("End X::"+this.dragEndPos.x);
        // console.log("End Y::"+this.dragEndPos.y);
        if (this.isTouchStart) {
          this.moveDiffereneX = Math.abs(this.dragEndPos.x - this.dragInitPos.x);
          this.moveDiffereneY = Math.abs(this.dragEndPos.y - this.dragInitPos.y);
        }
        this.dragOverEventData.emit({
          id: 'DRAG_OVER_END',
          data: Object.assign(Object.assign({}, this.dragEndPos), { pool: this.bookingEvent.POOL, nbOfDays: this.bookingEvent.NO_OF_DAYS }),
        });
      }
      else {
        let numberOfDays = Math.round(this.finalWidth / this.dayWidth);
        let initialStayDays = this.getStayDays();
        if (initialStayDays != numberOfDays && !isNaN(numberOfDays)) {
          //this.setStayDays(numberOfDays);
          if (this.resizeSide == 'leftSide') {
            this.element.style.left = `${this.initialLeft + (initialStayDays - numberOfDays) * this.dayWidth}px`;
            // set FROM_DATE = TO_DATE - numberOfDays
          }
          else {
            if (numberOfDays < initialStayDays) {
              this.isShrinking = true;
            }
            // set TO_DATE = FROM_DATE + numberOfDays
          }
          this.dragOverEventData.emit({
            id: 'STRETCH_OVER_END',
            data: {
              id: this.getBookingId(),
              fromRoomId: +this.getBookedRoomId(),
              x: +this.element.style.left.replace('px', ''),
              y: +this.element.style.top.replace('px', ''),
              pool: this.bookingEvent.POOL,
              nbOfDays: numberOfDays,
            },
          });
          this.element.style.width = `${numberOfDays * this.dayWidth - this.eventSpace}px`;
        }
        else {
          this.element.style.left = `${this.initialLeft}px`;
          this.element.style.width = `${numberOfDays * this.dayWidth - this.eventSpace}px`;
        }
      }
    }
    else {
      console.log('still mouse up listening...');
    }
    this.isDragging = false;
    document.removeEventListener('mousemove', this.handleMouseMoveBind);
    document.removeEventListener('touchmove', this.handleMouseMoveBind);
    document.removeEventListener('pointermove', this.handleMouseMoveBind);
    document.removeEventListener('mouseup', this.handleMouseUpBind);
    document.removeEventListener('touchup', this.handleMouseUpBind);
    document.removeEventListener('pointerup', this.handleMouseUpBind);
  }
  updateData(data) {
    this.updateEventData.emit(data);
  }
  renderEventBookingNumber() {
    if (this.bookingEvent.STATUS === 'TEMP-EVENT' || this.bookingEvent.ID === 'NEW_TEMP_EVENT') {
      return '';
    }
    if (utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE)) {
      return '';
    }
    if (!this.bookingEvent.is_direct) {
      return ` - ${this.bookingEvent.channel_booking_nbr}`;
    }
    return ` - ${this.bookingEvent.BOOKING_NUMBER}`;
  }
  showEventInfo(showInfo) {
    if (this.isHighlightEventType() || this.bookingEvent.hideBubble) {
      return null;
    }
    if (showInfo) {
      // Calculate which side we need to show the bubble, top side or bottom.
      let bodyContainer = document.querySelector('.calendarScrollContainer');
      let bodyContainerRect = bodyContainer.getBoundingClientRect();
      let elementRect = this.element.getBoundingClientRect();
      let midPoint = bodyContainerRect.height / 2 + bodyContainerRect.top + 50;
      // let topDifference = elementRect.top - bodyContainerRect.top;
      // let bottomDifference = bodyContainerRect.bottom - elementRect.bottom;
      if (elementRect.top < midPoint) {
        this.bubbleInfoTopSide = false;
      }
      else {
        this.bubbleInfoTopSide = true;
      }
    }
    // showInfo = true;
    if (showInfo) {
      this.hideBubbleInfo.emit({
        key: 'hidePopup',
        currentInfoBubbleId: this.getBookingId(),
      });
    }
    this.showInfoPopup = showInfo;
    this.renderAgain();
  }
  render() {
    // onMouseLeave={()=>this.showEventInfo(false)}
    let legend = this.getEventLegend();
    let noteNode = this.getNoteNode();
    let balanceNode = this.getBalanceNode();
    return (index.h(index.Host, { class: `bookingEvent  ${this.isNewEvent() || this.isHighlightEventType() ? 'newEvent' : ''} ${legend.clsName} `, style: this.getPosition(), id: 'event_' + this.getBookingId() }, index.h("div", { class: `bookingEventBase  ${!this.bookingEvent.is_direct &&
        !utils$1.isBlockUnit(this.bookingEvent.STATUS_CODE) &&
        this.bookingEvent.STATUS !== 'TEMP-EVENT' &&
        this.bookingEvent.ID !== 'NEW_TEMP_EVENT' &&
        'border border-dark'}  ${this.isSplitBooking() ? 'splitBooking' : ''}`, style: { backgroundColor: legend.color }, onTouchStart: event => this.startDragging(event, 'move'), onMouseDown: event => this.startDragging(event, 'move') }), noteNode ? index.h("div", { class: "legend_circle noteIcon", style: { backgroundColor: noteNode.color } }) : null, balanceNode ? index.h("div", { class: "legend_circle balanceIcon", style: { backgroundColor: balanceNode.color } }) : null, index.h("div", { class: "bookingEventTitle", onTouchStart: event => this.startDragging(event, 'move'), onMouseDown: event => this.startDragging(event, 'move') }, this.getBookedBy(), this.renderEventBookingNumber()), index.h(index.Fragment, null, index.h("div", { class: "bookingEventDragHandle leftSide", onTouchStart: event => this.startDragging(event, 'leftSide'), onMouseDown: event => this.startDragging(event, 'leftSide') }), index.h("div", { class: "bookingEventDragHandle rightSide", onTouchStart: event => this.startDragging(event, 'rightSide'), onMouseDown: event => this.startDragging(event, 'rightSide') })), this.showInfoPopup ? (index.h("igl-booking-event-hover", { is_vacation_rental: this.is_vacation_rental, countryNodeList: this.countryNodeList, currency: this.currency, class: "top", bookingEvent: this.bookingEvent, bubbleInfoTop: this.bubbleInfoTopSide })) : null));
  }
  get element() { return index.getElement(this); }
};
IglBookingEvent.style = iglBookingEventCss;

const _formatAmount = (amount, currency = 'USD') => {
  // format the amount using accounting.js
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

const iglBookingEventHoverCss = ".sc-igl-booking-event-hover-h{display:block;position:relative;z-index:100}.btn.sc-igl-booking-event-hover{padding-left:4px !important;padding-right:4px !important}.user-notes.sc-igl-booking-event-hover{margin-left:4px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:5;overflow:hidden;max-width:100%;height:auto}.mx-01.sc-igl-booking-event-hover{--m:5px;margin-left:var(--m) !important;margin-right:var(--m) !important}.pointerContainer.sc-igl-booking-event-hover{position:absolute;left:50%;height:10px;width:350px;transform:translate(-50%, 0)}.pointerContainerTop.sc-igl-booking-event-hover{top:-26px}.iglPopOver.sc-igl-booking-event-hover{background-color:#fff;padding:10px;border:1px solid #656ee7;border-radius:6px;position:absolute;transform:translate(-50%, 10px);left:50%;box-shadow:1px 0px 20px rgba(0, 0, 0, 0.2)}.iglPopOver.infoBubble.sc-igl-booking-event-hover{width:350px}.iglPopOver.blockedView.sc-igl-booking-event-hover{max-width:400px;width:400px}.iglPopOver.newBookingOptions.sc-igl-booking-event-hover{overflow-wrap:break-word !important;min-width:230px;width:fit-content}.bubblePointer.sc-igl-booking-event-hover{position:absolute;width:0;height:0;left:50%;border-left:10px solid transparent;border-right:10px solid transparent;transform:translate(-50%, 0px)}.bubblePointTop.sc-igl-booking-event-hover{border-top:10px solid #656ee7}.bubblePointBottom.sc-igl-booking-event-hover{border-bottom:10px solid #656ee7}.bubbleInfoAbove.sc-igl-booking-event-hover{bottom:35px}.updateBtnIcon.sc-igl-booking-event-hover{margin-right:4px}.icon-image.sc-igl-booking-event-hover{margin-right:5px}";

const IglBookingEventHover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.showBookingPopup = index.createEvent(this, "showBookingPopup", 7);
    this.hideBubbleInfo = index.createEvent(this, "hideBubbleInfo", 7);
    this.deleteButton = index.createEvent(this, "deleteButton", 7);
    this.bookingCreated = index.createEvent(this, "bookingCreated", 7);
    this.todayTimeStamp = new Date().setHours(0, 0, 0, 0);
    this.eventService = new events_service.EventsService();
    this.hideButtons = false;
    this.bookingEvent = undefined;
    this.bubbleInfoTop = false;
    this.currency = undefined;
    this.countryNodeList = undefined;
    this.is_vacation_rental = false;
    this.isLoading = undefined;
    this.shouldHideUnassignUnit = false;
  }
  componentWillLoad() {
    console.log('this.bookingEvent', this.bookingEvent);
    this.eventService.setToken(calendarData.calendar_data.token);
    let selectedRt = this.bookingEvent.roomsInfo.find(r => r.id === this.bookingEvent.RATE_TYPE);
    if (selectedRt) {
      console.log(selectedRt.physicalrooms.length === 1);
      this.shouldHideUnassignUnit = selectedRt.physicalrooms.length === 1;
    }
    if (moment.hooks(this.bookingEvent.TO_DATE, 'YYYY-MM-DD').isBefore(moment.hooks())) {
      this.hideButtons = true;
    }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.hideBubble();
    }
    else
      return;
  }
  hideBubble() {
    this.hideBubbleInfo.emit({
      key: 'hidebubble',
      currentInfoBubbleId: this.getBookingId(),
    });
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  componentDidLoad() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  getBookingId() {
    return this.bookingEvent.ID;
  }
  getTotalOccupants() {
    return this.bookingEvent.ADULTS_COUNT;
  }
  getPhoneNumber() {
    return this.bookingEvent.PHONE;
  }
  getCountry() {
    return utils.findCountry(this.bookingEvent.COUNTRY, this.countryNodeList).name;
  }
  getPhoneCode() {
    return utils.findCountry(this.bookingEvent.COUNTRY, this.countryNodeList).phone_prefix;
  }
  renderPhone() {
    return this.bookingEvent.COUNTRY ? `${this.bookingEvent.is_direct ? this.getPhoneCode() + '-' : ''}${this.getPhoneNumber()} - ${this.getCountry()}` : this.getPhoneNumber();
  }
  getGuestNote() {
    return this.bookingEvent.NOTES && index.h("p", { class: 'user-notes p-0 my-0' }, this.bookingEvent.NOTES);
  }
  getInternalNote() {
    return this.bookingEvent.INTERNAL_NOTE;
  }
  getTotalPrice() {
    return this.bookingEvent.TOTAL_PRICE;
  }
  getCheckInDate() {
    return this.bookingEvent.FROM_DATE_STR;
  }
  getCheckOutDate() {
    return this.bookingEvent.TO_DATE_STR;
  }
  getArrivalTime() {
    return this.bookingEvent.ARRIVAL_TIME;
  }
  getRatePlan() {
    return this.bookingEvent.RATE_PLAN;
  }
  getEntryDate() {
    return this.bookingEvent.ENTRY_DATE;
  }
  getReleaseAfterHours() {
    return this.bookingEvent.RELEASE_AFTER_HOURS;
  }
  isNewBooking() {
    return this.getBookingId() === 'NEW_TEMP_EVENT';
  }
  isCheckedIn() {
    return this.bookingEvent.STATUS === 'CHECKED-IN';
  }
  isCheckedOut() {
    return this.bookingEvent.STATUS === 'CHECKED-OUT';
  }
  isBlockedDateEvent() {
    return this.bookingEvent.STATUS === 'BLOCKED' || this.bookingEvent.STATUS === 'BLOCKED-WITH-DATES';
  }
  getRoomId() {
    return this.bookingEvent.PR_ID;
  }
  getCategoryByRoomId(roomId) {
    // console.log("room id ",roomId)
    // console.log("booking event",this.bookingEvent)
    return this.bookingEvent.roomsInfo.find(roomCategory => roomCategory.physicalrooms.find(room => room.id === roomId));
  }
  hasSplitBooking() {
    return this.bookingEvent.hasOwnProperty('splitBookingEvents') && this.bookingEvent.splitBookingEvents;
  }
  canCheckIn() {
    if (!this.fromTimeStamp) {
      let dt = new Date(this.getCheckInDate());
      dt.setHours(0, 0, 0, 0);
      this.fromTimeStamp = dt.getTime();
    }
    if (!this.toTimeStamp) {
      let dt = new Date(this.getCheckOutDate());
      dt.setHours(0, 0, 0, 0);
      this.toTimeStamp = dt.getTime();
    }
    if (this.isCheckedIn() || this.isCheckedOut()) {
      return false;
    }
    if (this.fromTimeStamp <= this.todayTimeStamp && this.todayTimeStamp <= this.toTimeStamp) {
      return true;
    }
    else {
      return false;
    }
  }
  canCheckOut() {
    if (this.isCheckedIn() && this.todayTimeStamp <= this.toTimeStamp) {
      return true;
    }
    else {
      return false;
    }
  }
  handleBlockDateUpdate(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.bookingEvent = Object.assign(Object.assign({}, this.bookingEvent), opt.data);
    //console.log("blocked date booking event", this.bookingEvent);
  }
  handleEditBooking() {
    // console.log("Edit booking");
    this.bookingEvent.TITLE = locales_store.locales.entries.Lcz_EditBookingFor;
    this.handleBookingOption('EDIT_BOOKING');
  }
  getStringDateFormat(dt) {
    return dt.getFullYear() + '-' + (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1) + '-' + (dt.getDate() <= 9 ? '0' : '') + dt.getDate();
  }
  handleAddRoom() {
    let fromDate = new Date(this.bookingEvent.FROM_DATE);
    fromDate.setHours(0, 0, 0, 0);
    let from_date_str = this.getStringDateFormat(fromDate);
    let toDate = new Date(this.bookingEvent.TO_DATE);
    //toDate.setDate(toDate.getDate() + 1);
    toDate.setHours(0, 0, 0, 0);
    let to_date_str = this.getStringDateFormat(toDate);
    //console.log(this.bookingEvent);
    let eventData = {
      ID: '',
      NAME: '',
      BOOKING_NUMBER: this.bookingEvent.BOOKING_NUMBER,
      FROM_DATE: from_date_str,
      TO_DATE: to_date_str,
      roomsInfo: this.bookingEvent.roomsInfo,
      ARRIVAL: this.bookingEvent.ARRIVAL,
      ADD_ROOM_TO_BOOKING: this.bookingEvent.ID,
      TITLE: 'Add Room to #' + this.bookingEvent.BOOKING_NUMBER,
      event_type: 'ADD_ROOM',
      ROOMS: this.bookingEvent.ROOMS,
      GUEST: this.bookingEvent.GUEST,
      message: this.bookingEvent.NOTES,
      SOURCE: this.bookingEvent.SOURCE,
      defaultDateRange: {
        fromDate: fromDate,
        fromDateStr: '',
        toDate: toDate,
        toDateStr: '',
        dateDifference: 0,
        editabled: true,
        message: 'Including 5.00% City Tax - Excluding 11.00% VAT',
      },
    };
    this.handleBookingOption('ADD_ROOM', eventData);
  }
  handleCustomerCheckIn() {
    console.log('Handle Customer Check In');
  }
  handleCustomerCheckOut() {
    console.log('Handle Customer Check Out');
  }
  handleDeleteEvent() {
    this.hideBubble();
    this.deleteButton.emit(this.bookingEvent.POOL);
    console.log('Delete Event');
  }
  async handleUpdateBlockedDates() {
    try {
      this.isLoading = 'update';
      setTimeout(() => {
        this.hideBubble();
      }, 50);
      await this.eventService.updateBlockedEvent(this.bookingEvent);
      this.isLoading = '';
    }
    catch (error) {
      //   toastr.error(error);
    }
  }
  handleConvertBlockedDateToBooking() {
    this.handleBookingOption('BAR_BOOKING');
  }
  getRoomInfo() {
    const roomIdToFind = +this.bookingEvent.PR_ID;
    let selectedRoom = {};
    for (const room of this.bookingEvent.roomsInfo) {
      for (const physicalRoom of room.physicalrooms) {
        if (roomIdToFind === physicalRoom.id) {
          selectedRoom.CATEGORY = room.name;
          selectedRoom.ROOM_NAME = physicalRoom.name;
          selectedRoom.ROOMS_INFO = room;
          return selectedRoom;
        }
      }
    }
    return selectedRoom;
  }
  renderTitle(eventType, roomInfo) {
    switch (eventType) {
      case 'EDIT_BOOKING':
        return `${locales_store.locales.entries.Lcz_EditBookingFor} ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
      case 'ADD_ROOM':
        return `${locales_store.locales.entries.Lcz_AddingUnitToBooking}# ${this.bookingEvent.BOOKING_NUMBER}`;
      case 'SPLIT_BOOKING':
        return locales_store.locales.entries.Lcz_Adding + ` ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
      default:
        return `${locales_store.locales.entries.Lcz_NewBookingFor} ${roomInfo.CATEGORY} ${roomInfo.ROOM_NAME}`;
    }
  }
  handleBookingOption(eventType, roomData = null) {
    const roomInfo = this.getRoomInfo();
    let data = roomData ? roomData : this.bookingEvent;
    data.event_type = eventType;
    data.TITLE = this.renderTitle(eventType, roomInfo);
    if (['003', '002', '004'].includes(this.bookingEvent.STATUS_CODE)) {
      data.roomsInfo = [roomInfo.ROOMS_INFO];
    }
    this.showBookingPopup.emit({
      key: 'add',
      data: Object.assign({}, data),
    });
    this.hideBubbleInfo.emit({
      key: 'hidebubble',
      currentInfoBubbleId: this.getBookingId(),
    });
  }
  renderNote() {
    const { is_direct, ota_notes } = this.bookingEvent;
    const guestNote = this.getGuestNote();
    const noteLabel = locales_store.locales.entries.Lcz_Note + ':';
    if (!is_direct && ota_notes) {
      return (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "col-12 px-0 text-wrap d-flex" }, index.h("ota-label", { label: noteLabel, remarks: ota_notes }))));
    }
    else if (is_direct && guestNote) {
      return (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "col-12 px-0 text-wrap d-flex" }, index.h(index.Fragment, null, index.h("span", { class: "font-weight-bold" }, noteLabel, " "), guestNote))));
    }
    return null;
  }
  getInfoElement() {
    var _a, _b;
    return (index.h("div", { class: `iglPopOver infoBubble ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, index.h("div", { class: "row p-0 m-0 pb-1" }, index.h("div", { class: "px-0 col-8 font-weight-bold font-medium-1 d-flex align-items-center" }, index.h("img", { src: (_b = (_a = this.bookingEvent) === null || _a === void 0 ? void 0 : _a.origin) === null || _b === void 0 ? void 0 : _b.Icon, alt: "icon", class: 'icon-image' }), index.h("p", { class: 'p-0 m-0' }, !this.bookingEvent.is_direct ? this.bookingEvent.channel_booking_nbr : this.bookingEvent.BOOKING_NUMBER)), index.h("div", { class: "pr-0 col-4 text-right" }, _formatAmount(this.getTotalPrice(), this.currency.code))), index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "px-0 pr-0 col-12" }, index.h("ir-date-view", { from_date: this.bookingEvent.FROM_DATE, to_date: this.bookingEvent.TO_DATE, showDateDifference: false }))), this.getArrivalTime() && (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "px-0 col-12" }, index.h("span", { class: "font-weight-bold" }, locales_store.locales.entries.Lcz_ArrivalTime, ": "), this.getArrivalTime()))), this.getTotalOccupants() && (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "px-0  col-12" }, index.h("span", { class: "font-weight-bold" }, locales_store.locales.entries.Lcz_Occupancy, ": "), this.getTotalOccupants()))), this.getPhoneNumber() && (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "px-0  col-12 text-wrap" }, index.h("span", { class: "font-weight-bold" }, locales_store.locales.entries.Lcz_Phone, ": "), this.renderPhone()))), this.getRatePlan() && (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "px-0  col-12" }, index.h("span", { class: "font-weight-bold" }, locales_store.locales.entries.Lcz_RatePlan, ": "), this.getRatePlan()))), this.renderNote(), this.getInternalNote() ? (index.h("div", { class: "row p-0 m-0" }, index.h("div", { class: "col-12 px-0 text-wrap" }, this.bookingEvent.is_direct ? (index.h(index.Fragment, null, index.h("span", { class: "font-weight-bold" }, locales_store.locales.entries.Lcz_InternalRemark, ": "), this.getInternalNote())) : (index.h("ota-label", { label: `${locales_store.locales.entries.Lcz_InternalRemark}:`, remarks: this.bookingEvent.ota_notes }))))) : null, index.h("div", { class: "row p-0 m-0 mt-2" }, index.h("div", { class: "full-width btn-group  btn-group-sm font-small-3", role: "group" }, index.h("button", { type: "button", class: `btn btn-primary d-flex align-items-center justify-content-center ${this.hideButtons ? 'mr-0' : 'mr-1'} ${this.shouldHideUnassignUnit ? 'w-50' : ''}`, onClick: _ => {
        this.handleEditBooking();
      }, disabled: !this.bookingEvent.IS_EDITABLE }, index.h("svg", { class: "p-0 m-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", height: "12", width: "12", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" })), index.h("span", null, "\u00A0", locales_store.locales.entries.Lcz_Edit)), this.bookingEvent.is_direct && this.bookingEvent.IS_EDITABLE && !this.hideButtons && (index.h("button", { type: "button", class: `btn btn-primary d-flex align-items-center justify-content-center ${!this.shouldHideUnassignUnit ? 'mr-1' : 'w-50'}`, onClick: _ => {
        this.handleAddRoom();
      } }, index.h("svg", { class: "p-0 m-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", height: 12, width: 12 }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" })), index.h("span", null, "\u00A0", locales_store.locales.entries.Lcz_AddRoom))), this.hideButtons
      ? null
      : !this.shouldHideUnassignUnit && (index.h("button", { type: "button", class: "btn btn-primary p-0 d-flex align-items-center justify-content-center", onClick: _ => {
          this.handleDeleteEvent();
        }, disabled: !this.bookingEvent.IS_EDITABLE || this.is_vacation_rental }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "8.75", class: "p-0 m-0", viewBox: "0 0 384 512" }, index.h("path", { fill: "currentColor", d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })), index.h("span", { class: "m-0 p-0" }, "\u00A0", locales_store.locales.entries.Lcz_Unassign)))))));
  }
  getNewBookingOptions() {
    const shouldDisplayButtons = this.bookingEvent.roomsInfo[0].rateplans.some(rate => rate.is_active);
    return (index.h("div", { class: `iglPopOver newBookingOptions ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, shouldDisplayButtons ? (index.h(index.Fragment, null, index.h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('BAR_BOOKING');
      } }, locales_store.locales.entries.Lcz_CreateNewBooking), this.hasSplitBooking() ? (index.h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary mb-1 font-small-3 square", onClick: _ => {
        this.handleBookingOption('SPLIT_BOOKING');
      } }, locales_store.locales.entries.Lcz_AssignUnitToExistingBooking)) : null)) : (index.h("p", { class: 'text-danger' }, locales_store.locales.entries.Lcz_NoRatePlanDefined)), index.h("button", { type: "button", class: "d-block full-width btn btn-sm btn-primary font-small-3 square", onClick: _ => {
        this.handleBookingOption('BLOCK_DATES');
      } }, locales_store.locales.entries.Lcz_Blockdates)));
  }
  getBlockedView() {
    // let defaultData = {RELEASE_AFTER_HOURS: 0, OPTIONAL_REASON: "", OUT_OF_SERVICE: false};
    return (index.h("div", { class: `iglPopOver blockedView ${this.bubbleInfoTop ? 'bubbleInfoAbove' : ''} text-left` }, index.h("igl-block-dates-view", { isEventHover: true, entryHour: this.bookingEvent.ENTRY_HOUR, entryMinute: this.bookingEvent.ENTRY_MINUTE, defaultData: this.bookingEvent, fromDate: moment.hooks(this.bookingEvent.FROM_DATE, 'YYYY-MM-DD').format('DD MM YYYY'), toDate: moment.hooks(this.bookingEvent.TO_DATE, 'YYYY-MM-DD').format('DD MM YYYY'), entryDate: this.getEntryDate(), onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), index.h("div", { class: "row p-0 m-0 mt-2" }, index.h("div", { class: "full-width btn-group btn-group-sm font-small-3", role: "group" }, index.h("button", { disabled: this.isLoading === 'update', type: "button", class: "btn btn-primary mr-1 d-flex align-items-center justify-content-center", onClick: _ => {
        this.handleUpdateBlockedDates();
      } }, this.isLoading === 'update' ? (index.h("i", { class: "la la-circle-o-notch spinner mx-1" })) : (index.h("svg", { class: "p-0 m-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", height: "12", width: "12", viewBox: "0 0 512 512" }, index.h("path", { fill: "currentColor", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), index.h("span", null, "\u00A0", locales_store.locales.entries.Lcz_Update)), index.h("button", { type: "button", class: "btn btn-primary", onClick: _ => {
        this.handleConvertBlockedDateToBooking();
      } }, locales_store.locales.entries.Lcz_ConvertToBooking), index.h("button", { type: "button", class: "btn btn-danger ml-1 d-flex align-items-center justify-content-center", onClick: _ => {
        this.handleDeleteEvent();
      } }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "12", width: "10.5", viewBox: "0 0 448 512" }, index.h("path", { fill: "currentColor", d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })), index.h("span", null, "\u00A0", locales_store.locales.entries.Lcz_Delete))))));
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: `pointerContainer ${this.bubbleInfoTop ? 'pointerContainerTop' : ''}` }, index.h("div", { class: `bubblePointer ${this.bubbleInfoTop ? 'bubblePointTop' : 'bubblePointBottom'}` })), this.isBlockedDateEvent() ? this.getBlockedView() : null, this.isNewBooking() ? this.getNewBookingOptions() : null, !this.isBlockedDateEvent() && !this.isNewBooking() ? this.getInfoElement() : null));
  }
  get element() { return index.getElement(this); }
};
IglBookingEventHover.style = iglBookingEventHoverCss;

const irPopoverCss = ".sc-ir-popover-h{display:block;width:100%}*.sc-ir-popover{box-sizing:border-box}.popover-title.sc-ir-popover{position:relative;width:100%;height:100%;margin:0;padding:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;z-index:10;left:0}.popover-container.sc-ir-popover{position:absolute;bottom:0px;left:var(--ir-popover-left, 10px);background:rgb(0, 0, 0);color:white;min-width:100%;box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 10px;z-index:9999;padding:3.5px 7px;border-radius:5px;pointer-events:none;opacity:0;transition:all 100ms ease;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-style:normal;font-weight:400;line-height:1.45;text-decoration:none;text-shadow:none;font-size:0.875rem}.popover-container[data-state='show'].sc-ir-popover{opacity:1}";

const IrPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.handleMouseEnter = () => {
      if (!this.showPopover) {
        return;
      }
      if (this.showPopover) {
        this.isHovered = true;
      }
    };
    this.handleMouseLeave = () => {
      if (!this.showPopover) {
        return;
      }
      this.isHovered = false;
    };
    this.popoverTitle = undefined;
    this.isHovered = false;
    this.showPopover = false;
    this.irPopoverLeft = '10px';
  }
  componentWillLoad() {
    this.checkTitleWidth();
  }
  checkTitleWidth() {
    requestAnimationFrame(() => {
      const titleElement = this.el.querySelector('.popover-title');
      if (titleElement) {
        const width = titleElement.scrollWidth;
        this.showPopover = width > 150; // Show popover if title width exceeds 170px
      }
    });
  }
  render() {
    return (index.h(index.Host, { style: { '--ir-popover-left': this.irPopoverLeft } }, index.h("p", { class: "popover-title", onMouseLeave: this.handleMouseLeave, onMouseEnter: this.handleMouseEnter }, this.popoverTitle), this.showPopover && this.isHovered && (index.h("div", { "data-state": "show", class: "popover-container" }, this.popoverTitle))));
  }
  get el() { return index.getElement(this); }
};
IrPopover.style = irPopoverCss;

exports.igl_booking_event = IglBookingEvent;
exports.igl_booking_event_hover = IglBookingEventHover;
exports.ir_popover = IrPopover;

//# sourceMappingURL=igl-booking-event_3.cjs.entry.js.map