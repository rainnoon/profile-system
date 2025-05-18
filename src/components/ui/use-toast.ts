import { useToast as useToastHook, type ToastProps } from "./toast"

export const useToast = useToastHook

export type { ToastProps }

export function toast(props: ToastProps) {
  const { toast } = useToast()
  return toast(props)
}
