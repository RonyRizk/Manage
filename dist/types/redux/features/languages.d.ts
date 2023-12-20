import { PayloadAction } from '@reduxjs/toolkit';
export interface Languages {
  entries: {
    [key: string]: any;
  };
  direction: 'ltr' | 'rtl';
}
export declare const languagesSlice: import("@reduxjs/toolkit").Slice<Languages, {
  addLanguages: (state: {
    entries: {
      [x: string]: any;
    };
    direction: 'ltr' | 'rtl';
  }, action: PayloadAction<Languages>) => void;
}, "languages", "languages", import("@reduxjs/toolkit").SliceSelectors<Languages>>;
export declare const addLanguages: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Languages, "languages/addLanguages">;
declare const _default: import("redux").Reducer<Languages>;
export default _default;
