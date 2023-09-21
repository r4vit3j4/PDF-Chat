import { RootState } from "@/redux/store/store";
import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./services";

const initialState: IMessagesInitialState = {
  messages: [],
  status: {
    isLoading: false,
    isError: false,
    error: undefined,
  },
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        content: action.payload,
        role: "user",
      });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.status.isLoading = true;
        state.status.isError = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push({
          content: action.payload.content,
          role: "assistant",
        });
        state.status.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status.error = action.payload?.error;
        state.status.isError = true;
        state.status.isLoading = false;
      });
  },
});

export const selectMessages = (state: RootState) => state.messages;

export const { addMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;
