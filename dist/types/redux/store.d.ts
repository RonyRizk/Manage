export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
  languages: import("./features/languages").Languages;
  calendar_data: import("../models/calendarData").CalendarDataDetails;
  calendar_dates: import("./features/calendarDates").ICalendarDates;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
  dispatch: import("redux-thunk").ThunkDispatch<{
    languages: import("./features/languages").Languages;
    calendar_data: import("../models/calendarData").CalendarDataDetails;
    calendar_dates: import("./features/calendarDates").ICalendarDates;
  }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
