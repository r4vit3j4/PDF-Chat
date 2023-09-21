import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { buttonVariants } from "../button";
import { CommandIcon, GithubIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-transparent">
      <div className="container flex items-center justify-between p-4 ">
        <Link href="/" className="flex items-center gap-1 font-semibold">
          <CommandIcon className="h-5 w-5" />
          PDF Chat
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            className={buttonVariants({
              size: "sm",
              variant: "secondary",
            })}
            href="https://github.com/r4vit3j4/PDF-Chat"
            target="_blank"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
