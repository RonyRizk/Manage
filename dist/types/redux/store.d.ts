export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
  languages: import("./features/languages").Languages;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
  dispatch: import("redux-thunk").ThunkDispatch<{
    languages: import("./features/languages").Languages;
  }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
