import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

interface IMessageProps {
  content: string;
  role: string;
}

const Message = ({ content, role }: IMessageProps) => {
  return (
    <div
      className={cn(
        "w-fit max-w-xs rounded-lg border p-2",
        role === "user" ? "self-end" : "self-start",
      )}
    >
      <p className="text-sm font-medium leading-6">
        <Balancer>{content}</Balancer>
      </p>
    </div>
  );
};

export default Message;
