'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4794c294.js');

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return undefined;
  return index.bootstrapLazy(JSON.parse("[[\"igloo-calendar.cjs\",[[2,\"igloo-calendar\",{\"propertyid\":[2],\"from_date\":[1025],\"to_date\":[1],\"language\":[1],\"baseurl\":[1],\"loadingMessage\":[1,\"loading-message\"],\"currencyName\":[1,\"currency-name\"],\"ticket\":[513],\"calendarData\":[32],\"days\":[32],\"scrollViewDragging\":[32],\"dialogData\":[32],\"bookingItem\":[32],\"editBookingItem\":[32],\"showLegend\":[32],\"showPaymentDetails\":[32],\"showToBeAssigned\":[32],\"unassignedDates\":[32],\"roomNightsData\":[32],\"renderAgain\":[32],\"showBookProperty\":[32],\"totalAvailabilityQueue\":[32]},[[0,\"deleteButton\",\"handleDeleteEvent\"],[8,\"scrollPageToRoom\",\"scrollPageToRoom\"],[0,\"showDialog\",\"handleShowDialog\"],[0,\"showRoomNightsDialog\",\"handleShowRoomNightsDialog\"],[0,\"addBookingDatasEvent\",\"handleBookingDatasChange\"],[8,\"showBookingPopup\",\"showBookingPopupEventDataHandler\"],[0,\"updateEventData\",\"updateEventDataHandler\"],[0,\"dragOverEventData\",\"dragOverEventDataHandler\"]]]]],[\"ir-channel-manager.cjs\",[[0,\"ir-channel-manager\",{\"hostRoom\":[16],\"mapReference\":[16],\"allowed_properties\":[16],\"allowed_channels\":[16],\"allowed_MinStayTypes\":[16],\"dropdownData\":[16],\"listData\":[1040],\"loader\":[32],\"mode\":[32],\"activeTab\":[32],\"selectedItem\":[32],\"item\":[32],\"anyChanges\":[32]},[[0,\"connectionOff\",\"connectionOffHandler\"],[0,\"sendToParent\",\"sendToParentHandler\"],[0,\"sendMappingToParent\",\"sendMappingToParentHandler\"],[0,\"createNew\",\"openSidebarHandler\"],[0,\"sendDelete\",\"requestDelete\"],[0,\"changeStatus\",\"changeStatusHandler\"]]]]],[\"ir-checkboxes.cjs\",[[0,\"ir-checkboxes\",{\"checkboxes\":[16]},[[0,\"checkboxChange\",\"handleCheckboxChange\"]]]]],[\"ir-channel_2.cjs\",[[6,\"ir-channel\"],[4,\"ir-common\",{\"extraResources\":[513,\"extra-resources\"],\"resources\":[32]}]]],[\"ir-span.cjs\",[[0,\"ir-span\",{\"text\":[8]}]]],[\"ir-switch.cjs\",[[0,\"ir-switch\",{\"value\":[1028],\"labelOn\":[1,\"label-on\"],\"labelOff\":[1,\"label-off\"],\"size\":[1],\"switch_animate\":[4],\"disabled\":[4],\"readonly\":[4],\"indeterminate\":[4],\"inverse\":[4],\"radioAllOff\":[4,\"radio-all-off\"],\"colorOn\":[1,\"color-on\"],\"offColor\":[1,\"off-color\"],\"classOn\":[1,\"class-on\"],\"offClass\":[1,\"off-class\"],\"labelText\":[1,\"label-text\"],\"handleWidth\":[1,\"handle-width\"],\"labelWidth\":[1,\"label-width\"],\"baseClass\":[1,\"base-class\"],\"wrapperClass\":[1,\"wrapper-class\"]}]]],[\"ir-textarea.cjs\",[[0,\"ir-textarea\",{\"rows\":[2],\"cols\":[2],\"text\":[1],\"label\":[1],\"placeholder\":[1]}]]],[\"ir-checkbox.cjs\",[[0,\"ir-checkbox\",{\"name\":[1],\"checked\":[1540],\"label\":[1],\"disabled\":[4],\"value\":[1],\"labelPosition\":[1,\"label-position\"]}]]],[\"ir-dropdown.cjs\",[[0,\"ir-dropdown\",{\"data\":[16],\"object\":[520],\"show\":[32]}]]],[\"ir-loading-screen.cjs\",[[2,\"ir-loading-screen\",{\"message\":[1]}]]],[\"ir-button.cjs\",[[4,\"ir-button\",{\"name\":[1],\"text\":[8],\"icon\":[1],\"btn_color\":[1],\"size\":[1],\"textSize\":[1,\"text-size\"],\"btn_block\":[4],\"btn_disabled\":[4],\"btn_type\":[1],\"isLoading\":[4,\"is-loading\"],\"btn_styles\":[1]}]]],[\"ir-modal.cjs\",[[2,\"ir-modal\",{\"modalTitle\":[1,\"modal-title\"],\"modalBody\":[1,\"modal-body\"],\"rightBtnActive\":[4,\"right-btn-active\"],\"leftBtnActive\":[4,\"left-btn-active\"],\"rightBtnText\":[1,\"right-btn-text\"],\"leftBtnText\":[1,\"left-btn-text\"],\"rightBtnColor\":[1,\"right-btn-color\"],\"leftBtnColor\":[1,\"left-btn-color\"],\"btnPosition\":[1,\"btn-position\"],\"iconAvailable\":[4,\"icon-available\"],\"icon\":[1],\"item\":[1032],\"isOpen\":[32],\"closeModal\":[64],\"openModal\":[64]},[[0,\"clickHanlder\",\"btnClickHandler\"]]]]],[\"ir-general-settings_5.cjs\",[[0,\"ir-general-settings\",{\"mode\":[1],\"allowed_channels\":[16],\"allowed_properties\":[16],\"allowed_MinStayTypes\":[16],\"connectionStatus\":[1537,\"connection-status\"],\"data\":[1040],\"testLoader\":[32],\"selectedChannel\":[32],\"connected\":[32]}],[0,\"ir-list-item\",{\"dropdownData\":[16],\"dropdownDataDisable\":[16],\"listData\":[16],\"type\":[32]},[[0,\"confirmModal\",\"doAction\"]]],[0,\"ir-mapping\",{\"mapReference\":[16],\"hostRoom\":[16],\"map\":[16],\"_onSaveMapping\":[64]}],[0,\"ir-topbar\"],[0,\"ir-loader\",{\"size\":[1]}]]],[\"igl-block-dates-view.cjs\",[[2,\"igl-block-dates-view\",{\"defaultData\":[16],\"fromDate\":[1,\"from-date\"],\"toDate\":[1,\"to-date\"],\"entryDate\":[1025,\"entry-date\"],\"entryHour\":[2,\"entry-hour\"],\"isEventHover\":[4,\"is-event-hover\"],\"entryMinute\":[2,\"entry-minute\"],\"renderAgain\":[32]}]]],[\"igl-booking-event_2.cjs\",[[2,\"igl-booking-event\",{\"currency\":[8],\"is_vacation_rental\":[4],\"language\":[1],\"bookingEvent\":[1040],\"allBookingEvents\":[16],\"countryNodeList\":[8,\"country-node-list\"],\"renderElement\":[32],\"position\":[32],\"isShrinking\":[32]},[[8,\"click\",\"handleClickOutside\"],[8,\"hideBubbleInfo\",\"hideBubbleInfoPopup\"],[8,\"moveBookingTo\",\"moveBookingToHandler\"],[8,\"revertBooking\",\"handleRevertBooking\"]]],[2,\"igl-booking-event-hover\",{\"bookingEvent\":[1040],\"bubbleInfoTop\":[4,\"bubble-info-top\"],\"currency\":[8],\"countryNodeList\":[16],\"is_vacation_rental\":[4],\"isLoading\":[32],\"shouldHideUnassignUnit\":[32]}]]],[\"igl-tba-booking-view_2.cjs\",[[2,\"igl-tba-category-view\",{\"calendarData\":[16],\"selectedDate\":[8,\"selected-date\"],\"categoriesData\":[16],\"categoryId\":[8,\"category-id\"],\"eventDatas\":[1032,\"event-datas\"],\"categoryIndex\":[8,\"category-index\"],\"renderAgain\":[32]}],[2,\"igl-tba-booking-view\",{\"calendarData\":[16],\"selectedDate\":[8,\"selected-date\"],\"eventData\":[16],\"categoriesData\":[16],\"categoryId\":[8,\"category-id\"],\"categoryIndex\":[8,\"category-index\"],\"eventIndex\":[8,\"event-index\"],\"renderAgain\":[32],\"selectedRoom\":[32]},[[8,\"highlightToBeAssignedBookingEvent\",\"highlightBookingEvent\"]]]]],[\"ir-autocomplete.cjs\",[[2,\"ir-autocomplete\",{\"duration\":[2],\"placeholder\":[1],\"propertyId\":[2,\"property-id\"],\"isSplitBooking\":[4,\"is-split-booking\"],\"type\":[1],\"name\":[1],\"inputId\":[1,\"input-id\"],\"required\":[4],\"disabled\":[4],\"value\":[1],\"from_date\":[1],\"to_date\":[1],\"danger_border\":[4],\"inputValue\":[32],\"data\":[32],\"selectedIndex\":[32],\"isComboBoxVisible\":[32],\"isLoading\":[32],\"isItemSelected\":[32]},[[4,\"click\",\"handleDocumentClick\"]]]]],[\"ir-date-picker.cjs\",[[2,\"ir-date-picker\",{\"fromDate\":[16],\"toDate\":[16],\"opens\":[1],\"autoApply\":[4,\"auto-apply\"],\"firstDay\":[2,\"first-day\"],\"monthNames\":[16],\"daysOfWeek\":[16],\"format\":[1],\"separator\":[1],\"applyLabel\":[1,\"apply-label\"],\"cancelLabel\":[1,\"cancel-label\"],\"fromLabel\":[1,\"from-label\"],\"toLabel\":[1,\"to-label\"],\"customRangeLabel\":[1,\"custom-range-label\"],\"weekLabel\":[1,\"week-label\"],\"disabled\":[4],\"singleDatePicker\":[4,\"single-date-picker\"],\"minDate\":[1,\"min-date\"],\"maxDate\":[1,\"max-date\"],\"maxSpan\":[8,\"max-span\"]}]]],[\"ir-input-text_2.cjs\",[[2,\"ir-input-text\",{\"name\":[1],\"value\":[8],\"label\":[1],\"placeholder\":[1],\"inputStyles\":[1,\"input-styles\"],\"required\":[4],\"LabelAvailable\":[4,\"label-available\"],\"readonly\":[4],\"type\":[1],\"submited\":[4],\"inputStyle\":[4,\"input-style\"],\"size\":[1],\"textSize\":[1,\"text-size\"],\"labelPosition\":[1,\"label-position\"],\"labelBackground\":[1,\"label-background\"],\"labelColor\":[1,\"label-color\"],\"labelBorder\":[1,\"label-border\"],\"labelWidth\":[2,\"label-width\"],\"valid\":[32],\"initial\":[32]}],[2,\"ir-select\",{\"name\":[1],\"data\":[16],\"label\":[1],\"selectStyles\":[1,\"select-styles\"],\"selectContainerStyle\":[1,\"select-container-style\"],\"selectedValue\":[1544,\"selected-value\"],\"required\":[4],\"LabelAvailable\":[4,\"label-available\"],\"firstOption\":[1,\"first-option\"],\"selectStyle\":[4,\"select-style\"],\"submited\":[4],\"size\":[1],\"textSize\":[1,\"text-size\"],\"labelPosition\":[1,\"label-position\"],\"labelBackground\":[1,\"label-background\"],\"labelColor\":[1,\"label-color\"],\"labelBorder\":[1,\"label-border\"],\"labelWidth\":[2,\"label-width\"],\"initial\":[32],\"valid\":[32]}]]],[\"ir-icon.cjs\",[[6,\"ir-icon\",{\"icon\":[1]}]]],[\"igl-booking-room-rate-plan_3.cjs\",[[2,\"igl-booking-room-rate-plan\",{\"defaultData\":[16],\"ratePlanData\":[16],\"totalAvailableRooms\":[2,\"total-available-rooms\"],\"index\":[2],\"ratePricingMode\":[16],\"currency\":[8],\"physicalrooms\":[8],\"shouldBeDisabled\":[4,\"should-be-disabled\"],\"dateDifference\":[2,\"date-difference\"],\"bookingType\":[1,\"booking-type\"],\"fullyBlocked\":[4,\"fully-blocked\"],\"isBookDisabled\":[4,\"is-book-disabled\"],\"defaultRoomId\":[8,\"default-room-id\"],\"selectedRoom\":[8,\"selected-room\"],\"selectedData\":[32],\"ratePlanChangedState\":[32]}],[2,\"igl-date-range\",{\"defaultData\":[16],\"disabled\":[516],\"minDate\":[1,\"min-date\"],\"dateLabel\":[8,\"date-label\"],\"maxDate\":[1,\"max-date\"],\"renderAgain\":[32]}],[2,\"ir-tooltip\",{\"message\":[513],\"open\":[32]}]]],[\"igl-application-info_5.cjs\",[[2,\"igl-book-property-header\",{\"splitBookingId\":[8,\"split-booking-id\"],\"bookingData\":[8,\"booking-data\"],\"minDate\":[1,\"min-date\"],\"sourceOptions\":[16],\"message\":[1],\"bookingDataDefaultDateRange\":[16],\"showSplitBookingOption\":[4,\"show-split-booking-option\"],\"adultChildConstraints\":[16],\"splitBookings\":[16],\"adultChildCount\":[16],\"dateRangeData\":[8,\"date-range-data\"],\"bookedByInfoData\":[8,\"booked-by-info-data\"],\"defaultDaterange\":[16],\"propertyId\":[2,\"property-id\"],\"isLoading\":[32]},[[16,\"fetchingIrInterceptorDataStatus\",\"handleFetchingDataStatus\"]]],[2,\"igl-booking-rooms\",{\"roomTypeData\":[16],\"defaultData\":[16],\"bookingType\":[1,\"booking-type\"],\"dateDifference\":[2,\"date-difference\"],\"ratePricingMode\":[16],\"roomInfoId\":[2,\"room-info-id\"],\"currency\":[8],\"isBookDisabled\":[4,\"is-book-disabled\"],\"initialRoomIds\":[8,\"initial-room-ids\"],\"selectedRooms\":[32],\"totalRooms\":[32],\"roomsDistributions\":[32]}],[2,\"igl-application-info\",{\"guestInfo\":[16],\"currency\":[8],\"roomsList\":[1040],\"guestRefKey\":[1,\"guest-ref-key\"],\"bedPreferenceType\":[16],\"selectedUnits\":[16],\"bookingType\":[1,\"booking-type\"],\"defaultGuestPreference\":[2,\"default-guest-preference\"],\"index\":[2],\"defaultGuestRoomId\":[2,\"default-guest-room-id\"],\"dateDifference\":[2,\"date-difference\"],\"filterdRoomList\":[32],\"isButtonPressed\":[32],\"guestData\":[32]},[[16,\"buttonClicked\",\"handleButtonClicked\"]]],[2,\"igl-property-booked-by\",{\"language\":[1],\"showPaymentDetails\":[4,\"show-payment-details\"],\"defaultData\":[16],\"countryNodeList\":[16],\"propertyId\":[2,\"property-id\"],\"isButtonPressed\":[32],\"bookedByData\":[32]},[[16,\"buttonClicked\",\"handleButtonClicked\"]]],[2,\"igl-book-property-footer\",{\"eventType\":[1,\"event-type\"],\"disabled\":[4]}]]],[\"igl-book-property_9.cjs\",[[2,\"igl-book-property\",{\"propertyid\":[2],\"allowedBookingSources\":[8,\"allowed-booking-sources\"],\"language\":[1],\"countryNodeList\":[8,\"country-node-list\"],\"showPaymentDetails\":[4,\"show-payment-details\"],\"currency\":[16],\"bookingData\":[1040],\"adultChildConstraints\":[16],\"adultChildCount\":[32],\"renderAgain\":[32],\"dateRangeData\":[32],\"defaultData\":[32],\"isLoading\":[32],\"buttonName\":[32]},[[0,\"inputCleared\",\"clearBooking\"],[0,\"spiltBookingSelected\",\"handleSpiltBookingSelected\"],[0,\"adultChild\",\"handleAdultChildChange\"],[0,\"dateSelectEvent\",\"onDateRangeSelect\"],[0,\"sourceDropDownChange\",\"handleSourceDropDown\"],[8,\"gotoSplitPageTwoEvent\",\"gotoSplitPageTwo\"],[0,\"buttonClicked\",\"handleButtonClicked\"]]],[2,\"ir-guest-info\",{\"setupDataCountries\":[1040],\"setupDataCountriesCode\":[1040],\"defaultTexts\":[16],\"language\":[1],\"email\":[1],\"booking_nbr\":[1],\"countries\":[32],\"submit\":[32],\"guest\":[32],\"isLoading\":[32]}],[2,\"ir-payment-details\",{\"bookingDetails\":[1040],\"defaultTexts\":[16],\"newTableRow\":[32],\"collapsedPayment\":[32],\"collapsedGuarantee\":[32],\"flag\":[32],\"confirmModal\":[32],\"toBeDeletedItem\":[32],\"paymentDetailsUrl\":[32],\"paymentExceptionMessage\":[32]}],[2,\"ir-pickup\",{\"defaultPickupData\":[16],\"numberOfPersons\":[2,\"number-of-persons\"],\"bookingNumber\":[1,\"booking-number\"],\"isLoading\":[32],\"allowedOptionsByLocation\":[32],\"pickupData\":[32],\"vehicleCapacity\":[32],\"cause\":[32]}],[2,\"ir-room\",{\"bookingEvent\":[16],\"bookingIndex\":[2,\"booking-index\"],\"mealCodeName\":[1,\"meal-code-name\"],\"myRoomTypeFoodCat\":[1,\"my-room-type-food-cat\"],\"currency\":[1],\"legendData\":[8,\"legend-data\"],\"roomsInfo\":[8,\"rooms-info\"],\"defaultTexts\":[16],\"ticket\":[8],\"hasRoomEdit\":[4,\"has-room-edit\"],\"hasRoomDelete\":[4,\"has-room-delete\"],\"hasRoomAdd\":[4,\"has-room-add\"],\"hasCheckIn\":[4,\"has-check-in\"],\"hasCheckOut\":[4,\"has-check-out\"],\"collapsed\":[32],\"item\":[32],\"isLoading\":[32],\"isModelOpen\":[32]},[[0,\"clickHanlder\",\"handleClick\"]]],[2,\"igl-booking-overview-page\",{\"bookingData\":[8,\"booking-data\"],\"propertyId\":[2,\"property-id\"],\"message\":[1],\"showSplitBookingOption\":[4,\"show-split-booking-option\"],\"eventType\":[1,\"event-type\"],\"currency\":[8],\"adultChildConstraints\":[16],\"ratePricingMode\":[8,\"rate-pricing-mode\"],\"dateRangeData\":[8,\"date-range-data\"],\"defaultDaterange\":[16],\"selectedRooms\":[16],\"adultChildCount\":[16],\"sourceOptions\":[16],\"bookedByInfoData\":[8,\"booked-by-info-data\"],\"initialRoomIds\":[8,\"initial-room-ids\"]}],[2,\"igl-pagetwo\",{\"showPaymentDetails\":[4,\"show-payment-details\"],\"currency\":[8],\"isEditOrAddRoomEvent\":[516,\"is-edit-or-add-room-event\"],\"dateRangeData\":[16],\"bookingData\":[16],\"showSplitBookingOption\":[4,\"show-split-booking-option\"],\"language\":[1],\"bookedByInfoData\":[16],\"propertyId\":[2,\"property-id\"],\"bedPreferenceType\":[8,\"bed-preference-type\"],\"selectedRooms\":[16],\"isLoading\":[513,\"is-loading\"],\"countryNodeList\":[8,\"country-node-list\"],\"selectedGuestData\":[8,\"selected-guest-data\"],\"defaultGuestData\":[16],\"selectedBookedByData\":[32],\"guestData\":[32],\"selectedUnits\":[32]}],[2,\"ir-label\",{\"label\":[1],\"value\":[1],\"iconShown\":[4,\"icon-shown\"],\"imageSrc\":[1,\"image-src\"]}],[1,\"ir-sidebar\",{\"name\":[1],\"side\":[1],\"showCloseButton\":[4,\"show-close-button\"],\"open\":[1540],\"sidebarStyles\":[16],\"toggleSidebar\":[64]}]]],[\"igl-cal-body_9.cjs\",[[2,\"ir-booking-details\",{\"language\":[1],\"ticket\":[1],\"bookingNumber\":[1,\"booking-number\"],\"baseurl\":[1],\"propertyid\":[2],\"hasPrint\":[4,\"has-print\"],\"hasReceipt\":[4,\"has-receipt\"],\"hasDelete\":[4,\"has-delete\"],\"hasMenu\":[4,\"has-menu\"],\"hasRoomEdit\":[4,\"has-room-edit\"],\"hasRoomDelete\":[4,\"has-room-delete\"],\"hasRoomAdd\":[4,\"has-room-add\"],\"hasCheckIn\":[4,\"has-check-in\"],\"hasCheckOut\":[4,\"has-check-out\"],\"bookingItem\":[32],\"statusData\":[32],\"tempStatus\":[32],\"showPaymentDetails\":[32],\"bookingData\":[32],\"countryNodeList\":[32],\"calendarData\":[32],\"guestData\":[32],\"defaultTexts\":[32],\"rerenderFlag\":[32],\"sidebarState\":[32],\"isUpdateClicked\":[32]},[[0,\"iconClickHandler\",\"handleIconClick\"],[0,\"editSidebar\",\"handleEditSidebar\"],[0,\"selectChange\",\"handleSelectChange\"],[0,\"clickHanlder\",\"handleClick\"],[0,\"editInitiated\",\"handleEditInitiated\"],[0,\"resetBookingData\",\"handleResetBookingData\"]]],[2,\"igl-cal-body\",{\"isScrollViewDragging\":[4,\"is-scroll-view-dragging\"],\"calendarData\":[16],\"today\":[16],\"currency\":[8],\"language\":[1],\"countryNodeList\":[8,\"country-node-list\"],\"dragOverElement\":[32],\"renderAgain\":[32]},[[8,\"dragOverHighlightElement\",\"dragOverHighlightElementHandler\"],[8,\"gotoRoomEvent\",\"gotoRoom\"],[8,\"addToBeAssignedEvent\",\"addToBeAssignedEvents\"],[8,\"closeBookingWindow\",\"closeWindow\"]]],[2,\"igl-to-be-assigned\",{\"unassignedDatesProp\":[8,\"unassigned-dates-prop\"],\"propertyid\":[2],\"from_date\":[1],\"to_date\":[1],\"calendarData\":[1040],\"loadingMessage\":[32],\"showDatesList\":[32],\"renderAgain\":[32],\"orderedDatesList\":[32]},[[8,\"gotoToBeAssignedDate\",\"gotoDate\"]]],[2,\"igl-cal-header\",{\"calendarData\":[16],\"today\":[16],\"propertyid\":[2],\"unassignedDates\":[8,\"unassigned-dates\"],\"to_date\":[1],\"renderAgain\":[32],\"unassignedRoomsNumber\":[32]},[[8,\"reduceAvailableUnitEvent\",\"handleReduceAvailableUnitEvent\"]]],[2,\"ir-interceptor\",{\"defaultMessage\":[1040],\"handledEndpoints\":[16],\"isShown\":[32],\"isLoading\":[32],\"isUnassignedUnit\":[32]}],[2,\"ir-room-nights\",{\"bookingNumber\":[1,\"booking-number\"],\"baseUrl\":[1,\"base-url\"],\"propertyId\":[2,\"property-id\"],\"language\":[1],\"identifier\":[1],\"toDate\":[1,\"to-date\"],\"fromDate\":[1,\"from-date\"],\"pool\":[1],\"ticket\":[1],\"bookingEvent\":[32],\"selectedRoom\":[32],\"rates\":[32],\"isLoading\":[32],\"initialLoading\":[32],\"inventory\":[32],\"isEndDateBeforeFromDate\":[32],\"defaultTotalNights\":[32]}],[2,\"igl-cal-footer\",{\"calendarData\":[16],\"today\":[16]}],[2,\"igl-legends\",{\"legendData\":[16]}],[2,\"ir-toast\",{\"position\":[1537],\"isVisible\":[32],\"isFocused\":[32],\"hideToast\":[64],\"showToast\":[64]},[[16,\"toast\",\"onToast\"]]]]]]"), options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map