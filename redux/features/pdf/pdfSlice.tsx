import { RootState } from "@/redux/store/store";
import { createSlice } from "@reduxjs/toolkit";
import { resetSystem, uploadPdf } from "./services";

const initialState: IPdfInitialState = {
  isPdfSelected: false,
  isPdfUploaded: false,
  pdfName: undefined,
  pdfUrl: undefined,
  pdfSourceId: undefined,
  status: {
    isLoading: false,
    isError: false,
    error: undefined,
  },
};

export const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setPdfName: (state, action) => {
      state.pdfName = action.payload;
    },
    setPdfUrl: (state, action) => {
      state.pdfUrl = action.payload;
      state.isPdfSelected = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPdf.pending, (state, action) => {
        state.status.isError = false;
        state.status.isLoading = true;
      })
      .addCase(uploadPdf.fulfilled, (state, action) => {
        state.status.isError = false;
        state.pdfSourceId = action.payload.sourceId;
        state.isPdfUploaded = true;
        state.status.isLoading = false;
      })
      .addCase(uploadPdf.rejected, (state, action) => {
        state.status.error = action.payload?.message;
        state.status.isError = true;
      })
      .addCase(resetSystem.pending, (state, action) => {
        state.status.isError = false;
        state.status.isLoading = true;
      })
      .addCase(resetSystem.fulfilled, (state, action) => {
        state.status.isError = false;
        state.isPdfSelected = false;
        state.pdfUrl = undefined;
        state.isPdfUploaded = false;
        state.status.isLoading = false;
      })
      .addCase(resetSystem.rejected, (state, action) => {
        state.status.error = action.payload?.message;
        state.status.isError = true;
      });
  },
});

export const selectPdf = (state: RootState) => state.pdf;
export const { setPdfUrl, setPdfName } = pdfSlice.actions;

export default pdfSlice.reducer;
