import { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Loader2 } from 'lucide-react';

interface AsyncBoundaryProps {
  children: React.ReactNode;
}

export function AsyncBoundary({ children }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}