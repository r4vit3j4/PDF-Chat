"use client";
import { usePdf } from "@/hooks/hook";
import { ArrowLeft, ArrowRight, Loader2Icon } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const PdfViewer = () => {
  const { pdfUrl, status } = usePdf();
  const { isLoading } = status;
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const incrementPageNumber = () => {
    if (pageNumber < numPages - 1) setPageNumber((prev) => prev + 1);
  };

  const decrementPageNumber = () => {
    if (pageNumber >= 1) setPageNumber((prev) => prev - 1);
  };

  return isLoading ? (
    <Skeleton className="h-[600px] w-full border" />
  ) : (
    <div className="flex h-[600px] w-full flex-col gap-4 rounded-lg border bg-background p-4">
      <ScrollArea className="w-full flex-1 rounded-lg border">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="h-full"
        >
          <Page pageIndex={pageNumber} />
        </Document>
      </ScrollArea>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium leading-none">
            Page {pageNumber + 1} of {numPages}
          </p>
        </div>
        <div className="flex items-center">
          <Button
            size="sm"
            variant="ghost"
            disabled={pageNumber <= 0}
            onClick={decrementPageNumber}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={pageNumber >= numPages - 1}
            onClick={incrementPageNumber}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
