import { Toaster } from "sonner"

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
}

export default ToastProvider
