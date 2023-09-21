"use client";
import { Loader2Icon, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch, useMessages, usePdf } from "@/hooks/hook";
import { FormEvent, useState } from "react";
import Message from "./Message";
import { sendMessage } from "@/redux/features/message/services";
import { addMessage } from "@/redux/features/message/messagesSlice";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";

const PdfChat = () => {
  const { messages, status } = useMessages();
  const { status: pdfStatus } = usePdf();
  const { isLoading, isError, error } = status;
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length > 1) {
      dispatch(addMessage(message));
      dispatch(sendMessage());
      setMessage("");
    }
  };

  return (
    <div className="h-full min-h-[500px] rounded-md border bg-background p-4">
      <div className="flex h-full flex-col gap-4">
        {pdfStatus.isLoading ? (
          <Skeleton className="w-full flex-1" />
        ) : (
          <ScrollArea className="h-[510px] w-full pr-5">
            {messages.length === 0 && (
              <div className="mt-20 flex justify-center">
                <p className="scroll-m-20 text-4xl font-extrabold tracking-tight text-muted lg:text-5xl">
                  PDF Chat
                </p>
              </div>
            )}

            <div className="flex w-full flex-col gap-4">
              {messages.map((message, index) => {
                return <Message key={index} {...message} />;
              })}

              {isLoading && <Skeleton className="h-24 w-full max-w-xs" />}
            </div>
          </ScrollArea>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" size="icon" disabled={message.length < 1}>
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PdfChat;
