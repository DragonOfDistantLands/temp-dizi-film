import { Card } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-muted-foreground">Bu sayfa yakında hazır olacak.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}