export interface IUploadPdfResponse {
  sourceId: string;
}

export interface IUploadPdfRejectResponse {
  code: string;
  message: string;
}

export interface IDeletePdfRejectResponse {
  code: string;
  message: string;
}

export interface ISendMessageResponse {
  content: string;
}

export interface ISendMessageRejectResponse {
  error: string;
}
