import { configureStore } from "@reduxjs/toolkit";
import languagesSlice from "./features/languages";
export const store = configureStore({
  reducer: {
    languages: languagesSlice,
  },
});
//# sourceMappingURL=store.js.map
