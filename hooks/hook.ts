import { selectMessages } from "@/redux/features/message/messagesSlice";
import { selectPdf } from "@/redux/features/pdf/pdfSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePdf = () => useAppSelector(selectPdf);

export const useMessages = () => useAppSelector(selectMessages);
