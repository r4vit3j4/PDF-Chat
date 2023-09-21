import { RootState } from "@/redux/store/store";
import {
  IDeletePdfRejectResponse,
  ISendMessageRejectResponse,
  ISendMessageResponse,
  IUploadPdfRejectResponse,
  IUploadPdfResponse,
} from "@/types/responses.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadPdf = createAsyncThunk<
  IUploadPdfResponse,
  FormData,
  {
    rejectValue: IUploadPdfRejectResponse;
  }
>("pdf/uploadPdf", async (pdfFile, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sources/add-file`,
      pdfFile,
      {
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data as IUploadPdfResponse;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as IUploadPdfRejectResponse);
  }
});

export const resetSystem = createAsyncThunk<
  undefined,
  undefined,
  {
    rejectValue: IDeletePdfRejectResponse;
    state: RootState;
  }
>("pdf/resetSystem", async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sources/delete`,
      {
        sources: [thunkAPI.getState().pdf.pdfSourceId],
      },
      {
        headers: {
          "x-api-key": `${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as IDeletePdfRejectResponse);
  }
});
