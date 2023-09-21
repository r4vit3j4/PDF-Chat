"use client";
import Footer from "@/components/footer/Footer";
import PdfChat from "@/components/pdf-chat/PdfChat";
import PdfInput from "@/components/pdf-input/PdfInput";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import { usePdf } from "@/hooks/hook";
import Balancer from "react-wrap-balancer";

const HomePage = () => {
  const { isPdfSelected } = usePdf();

  return (
    <div className="container relative mt-20">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <Balancer>Chat with any PDF</Balancer>
          </h1>
          <p className="text-xl text-muted-foreground ">
            <Balancer>Simply upload a PDF and start asking questions</Balancer>
          </p>
        </div>
        <PdfInput />

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {isPdfSelected && <PdfViewer />}
          {isPdfSelected && <PdfChat />}
        </div>
      </div>

      <div
        className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-35rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
