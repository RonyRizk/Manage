export class IglBookPropertyService {
  onDataRoomUpdate(event, selectedUnits, isEditBooking, name, pr_id, bookingData) {
    let units = selectedUnits;
    const { data, key, changedKey } = event.detail;
    const roomCategoryKey = `c_${data.roomCategoryId}`;
    const ratePlanKey = `p_${data.ratePlanId}`;
    if (this.shouldClearData(key)) {
      units = new Map();
    }
    this.initializeRoomCategoryIfNeeded(roomCategoryKey, units);
    if (isEditBooking) {
      if (changedKey === 'rate') {
        if (units.has(roomCategoryKey) && units.get(roomCategoryKey).has(ratePlanKey)) {
          this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, pr_id, bookingData);
        }
      }
      else {
        if (changedKey !== 'rateType') {
          if (changedKey === 'adult_child_offering') {
            if (units.has(roomCategoryKey) && selectedUnits.get(roomCategoryKey).has(ratePlanKey)) {
              this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, pr_id, bookingData);
            }
          }
          else {
            this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, pr_id, bookingData);
          }
        }
      }
    }
    else {
      this.setSelectedRoomData(roomCategoryKey, ratePlanKey, data, units);
    }
    this.cleanupEmptyData(roomCategoryKey, units);
    return units;
  }
  shouldClearData(key) {
    return key === 'clearData' || key === 'EDIT_BOOKING';
  }
  initializeRoomCategoryIfNeeded(roomCategoryKey, selectedUnits) {
    if (!selectedUnits.has(roomCategoryKey)) {
      selectedUnits.set(roomCategoryKey, new Map());
    }
  }
  getRoomsListFromCategoryId(bookingData, categoryId, pr_id) {
    var _a;
    let category = (_a = bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(category => category.id === +categoryId);
    if (category) {
      return category.physicalrooms.find(room => room.id === +pr_id);
    }
  }
  setSelectedRoomData(roomCategoryKey, ratePlanKey, data, selectedUnits) {
    let selectedRatePlans = selectedUnits.get(roomCategoryKey);
    if (data.totalRooms === 0) {
      selectedRatePlans.delete(ratePlanKey);
    }
    else {
      selectedUnits.set(roomCategoryKey, selectedRatePlans.set(ratePlanKey, Object.assign(Object.assign({}, data), { selectedUnits: Array(data.totalRooms).fill(-1) })));
    }
  }
  cleanupEmptyData(roomCategoryKey, selectedUnits) {
    if (selectedUnits.has(roomCategoryKey)) {
      let selectedRatePlans = selectedUnits.get(roomCategoryKey);
      if (selectedRatePlans.size === 0) {
        selectedUnits.delete(roomCategoryKey);
      }
    }
  }
  applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, selectedUnits, name, pr_id, bookingData) {
    selectedUnits.clear();
    const selectedRoom = this.getRoomsListFromCategoryId(bookingData, roomCategoryKey.substring(2, roomCategoryKey.length), pr_id);
    if (selectedRoom) {
      data.physicalRooms.push(selectedRoom);
    }
    selectedUnits.set(roomCategoryKey, new Map().set(ratePlanKey, Object.assign(Object.assign({}, data), { guestName: name, roomId: selectedRoom ? pr_id : "" })));
  }
  prepareBookUserServiceParams(context, check_in) {
    const arrivalTime = context.isEventType('EDIT_BOOKING') ? context.getArrivalTimeForBooking() : '';
    const pr_id = context.isEventType('BAR_BOOKING') ? context.bookingData.PR_ID : undefined;
    const bookingNumber = context.isEventType('EDIT_BOOKING') ? context.bookingData.BOOKING_NUMBER : undefined;
    return [
      context.bookedByInfoData,
      check_in,
      context.bookingData.defaultDateRange.fromDate,
      context.bookingData.defaultDateRange.toDate,
      context.guestData,
      context.dateRangeData.dateDifference,
      context.sourceOption,
      context.propertyid,
      context.currency,
      bookingNumber,
      context.bookingData.GUEST,
      arrivalTime,
      pr_id,
    ];
  }
  getBookingPreferenceRoomId(bookingData) {
    return (bookingData.hasOwnProperty('PR_ID') && bookingData.PR_ID) || null;
  }
  getRoomCategoryByRoomId(roomId, bookingData) {
    var _a;
    return (_a = bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
      return roomCategory.physicalrooms.find(room => room.id === +roomId);
    });
  }
  setEditingRoomInfo(bookingData, selectedUnits) {
    const category = this.getRoomCategoryByRoomId(this.getBookingPreferenceRoomId(bookingData), bookingData);
    const room_id = `c_${category.id}`;
    const ratePlanId = `p_${bookingData.RATE_PLAN_ID}`;
    const data = {
      adultCount: bookingData.ADULTS_COUNT,
      rate: bookingData.RATE,
      rateType: bookingData.RATE_TYPE,
      ratePlanId: bookingData.RATE_PLAN_ID,
      roomCategoryId: category.id,
      roomCategoryName: category.name,
      totalRooms: 1,
      ratePlanName: bookingData.RATE_PLAN,
      roomId: bookingData.PR_ID,
      guestName: bookingData.NAME,
      cancelation: bookingData.cancelation,
      guarantee: bookingData.guarantee,
      adult_child_offering: bookingData.adult_child_offering,
    };
    selectedUnits.set(room_id, new Map().set(ratePlanId, data));
  }
}
//# sourceMappingURL=igl-book-property.service.js.map
