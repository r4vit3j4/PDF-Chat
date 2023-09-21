interface IPdfInitialState {
  isPdfSelected: boolean;
  isPdfUploaded: boolean;
  pdfName: string | undefined;
  pdfUrl: string | undefined;
  pdfSourceId: string | undefined;
  status: {
    isLoading: boolean;
    isError: boolean;
    error: string | undefined;
  };
}

interface IMessagesInitialState {
  messages: IMessage[];
  status: {
    isLoading: boolean;
    isError: boolean;
    error: string | undefined;
  };
}
