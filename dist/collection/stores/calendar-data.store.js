import { createStore } from "@stencil/store";
const { state: calendarDataState } = createStore({
  adultChildConstraints: {
    adult_max_nbr: 0,
    child_max_nbr: 0,
    child_max_age: 0,
  },
  allowedBookingSources: [],
  currency: undefined,
  endingDate: 0,
  formattedLegendData: undefined,
  is_vacation_rental: false,
  legendData: [],
  roomsInfo: [],
  startingDate: 0,
  language: '',
  toBeAssignedEvents: [],
  taxes: [],
  max_nights: 0,
  allowed_payment_methods: [],
  pickup_service: undefined,
  is_frontdesk_enabled: false,
  id: 0,
  name: '',
  token: '',
});
export default calendarDataState;
//# sourceMappingURL=calendar-data.store.js.map
