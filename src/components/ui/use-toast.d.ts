declare module '@/components/ui/use-toast' {
  export interface ToastProps {
    id?: string;
    title?: string;
    description?: string;
    action?: React.ReactNode;
    duration?: number;
    className?: string;
    variant?: 'default' | 'destructive';
  }

  export function toast(props: ToastProps): void;
  export function useToast(): {
    toast: (props: ToastProps) => void;
    dismiss: (id: string) => void;
  };
}
