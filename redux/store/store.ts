import { configureStore } from "@reduxjs/toolkit";
import pdfReducer from "../features/pdf/pdfSlice";
import messagesReducer from "../features/message/messagesSlice";

export const store = configureStore({
  reducer: {
    pdf: pdfReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
