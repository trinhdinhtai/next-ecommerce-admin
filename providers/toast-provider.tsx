"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
        },
      }}
    />
  );
};

export default ToastProvider;
