import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: '',
      synopsis: '',
      rating: '',
      year: '',
      duration: '',
      poster: '',
      coverImage: '',
      cast: '',
      type: 'series',
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // API call simulation
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "İçerik başarıyla eklendi",
      description: "Yeni içerik sisteme eklendi.",
    });
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="p-6">
          <Tabs defaultValue="content">
            <TabsList className="mb-6">
              <TabsTrigger value="content">İçerik Yönetimi</TabsTrigger>
              <TabsTrigger value="users">Kullanıcı Yönetimi</TabsTrigger>
              <TabsTrigger value="stats">İstatistikler</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input {...form.register('title')} placeholder="Başlık" />
                <Input {...form.register('synopsis')} placeholder="Özet" />
                <Input {...form.register('rating')} placeholder="IMDb Puanı" type="number" step="0.1" />
                <Input {...form.register('year')} placeholder="Yıl" />
                <Input {...form.register('duration')} placeholder="Süre" />
                <Input {...form.register('poster')} placeholder="Afiş URL" />
                <Input {...form.register('coverImage')} placeholder="Kapak Resmi URL" />
                <Input {...form.register('cast')} placeholder="Oyuncular (virgülle ayırın)" />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Ekleniyor..." : "İçerik Ekle"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="users">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Kullanıcı yönetimi yakında eklenecek</h3>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">İstatistikler yakında eklenecek</h3>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}