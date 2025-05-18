import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  toast: (props: ToastProps) => void;
  dismiss: (id: string) => void;
} | null>(null)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  className?: string;
}

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastContextProps {
  children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContextProps) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])

    if (props.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, props.duration || 3000)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastProvider.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => dismiss(t.id!)} />
        ))}
      </div>
    </ToastProvider.Provider>
  )
}

export function Toast({
  className,
  variant,
  title,
  description,
  action,
  onClose,
  ...props
}: ToastProps & { onClose: () => void }) {
  return (
    <div
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      <button
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">关闭</span>
      </button>
    </div>
  )
}

export function useToast() {
  const context = React.useContext(ToastProvider)
  if (!context) {
    throw new Error("useToast must be used within a ToastContainer")
  }
  return context
}
