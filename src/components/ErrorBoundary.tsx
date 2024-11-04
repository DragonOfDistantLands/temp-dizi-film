import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Bir Hata Oluştu</h2>
              <p className="text-muted-foreground">
                Üzgünüz, beklenmedik bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={this.handleReload} variant="default">
                  Sayfayı Yenile
                </Button>
                <Button onClick={this.handleGoHome} variant="outline">
                  Ana Sayfaya Dön
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg text-left">
                  <p className="font-mono text-sm text-destructive">
                    {this.state.error?.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}