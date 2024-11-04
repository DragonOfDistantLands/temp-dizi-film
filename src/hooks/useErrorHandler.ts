import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AppError } from '@/lib/error';

export function useErrorHandler() {
  const { toast } = useToast();

  const handleError = useCallback((error: unknown) => {
    if (error instanceof AppError) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive',
      });
    } else if (error instanceof Error) {
      toast({
        title: 'Beklenmeyen Hata',
        description: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        variant: 'destructive',
      });
      console.error(error);
    } else {
      toast({
        title: 'Hata',
        description: 'Bilinmeyen bir hata oluştu.',
        variant: 'destructive',
      });
      console.error('Unknown error:', error);
    }
  }, [toast]);

  return { handleError };
}