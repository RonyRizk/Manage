import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  entries: {},
  direction: 'ltr',
};
export const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    addLanguages: (state, action) => {
      const { direction, entries } = action.payload;
      state.entries = entries;
      state.direction = direction;
    },
  },
});
export const { addLanguages } = languagesSlice.actions;
export default languagesSlice.reducer;
//# sourceMappingURL=languages.js.map
