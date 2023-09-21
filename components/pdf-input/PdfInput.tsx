"use client";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, usePdf } from "@/hooks/hook";
import { resetSystem, uploadPdf } from "@/redux/features/pdf/services";
import { setPdfName, setPdfUrl } from "@/redux/features/pdf/pdfSlice";
import { Button } from "../ui/button";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { clearMessages } from "@/redux/features/message/messagesSlice";

const PdfInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const dispatch = useAppDispatch();

  const { isPdfSelected, isPdfUploaded, pdfName } = usePdf();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      dispatch(setPdfName(e.target.files[0].name));
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      dispatch(uploadPdf(formData));
    }
  };

  const handleDelete = () => {
    dispatch(resetSystem());
    dispatch(clearMessages());
    setFile(undefined);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const url = e.target?.result?.toString();
        if (url) {
          dispatch(setPdfUrl(url));
        }
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Input
        ref={inputRef}
        type="file"
        onChange={handleInput}
        className="hidden"
        disabled={isPdfSelected || isPdfUploaded}
        accept="application/pdf"
      />

      {isPdfSelected ? (
        <p className="shrink rounded-lg border bg-background p-3 text-center text-sm font-medium leading-4">
          {pdfName}
        </p>
      ) : (
        <div
          className="cursor-pointer rounded-lg border bg-background p-4 px-6 transition ease-in-out hover:bg-muted"
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <UploadIcon className="h-6 w-6" />
            <p className="text-sm font-medium leading-none">Upload PDF</p>
          </div>
        </div>
      )}

      {isPdfUploaded && (
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          <Trash2Icon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default PdfInput;
