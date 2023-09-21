import { RootState } from "@/redux/store/store";
import {
  ISendMessageRejectResponse,
  ISendMessageResponse,
} from "@/types/responses.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk<
  ISendMessageResponse,
  undefined,
  {
    rejectValue: ISendMessageRejectResponse;
    state: RootState;
  }
>("pdf/sendMessage", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/message`,
      {
        sourceId: thunkAPI.getState().pdf.pdfSourceId,
        messages: thunkAPI.getState().messages.messages,
      },
      {
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data as ISendMessageResponse;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ISendMessageRejectResponse);
  }
});
