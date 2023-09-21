"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "../theme/theme-provider";
import { store } from "@/redux/store/store";

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default Providers;
