import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  subject: z.string().min(2, 'Konu en az 2 karakter olmalıdır').max(100, 'Konu en fazla 100 karakter olabilir'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır').max(1000, 'Mesaj en fazla 1000 karakter olabilir'),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mesajınız iletildi",
        description: "En kısa sürede size dönüş yapacağız.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesajınız iletilemedi. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">İletişim</h1>
              <p className="text-muted-foreground mt-2">
                Bizimle iletişime geçmek için aşağıdaki formu doldurun.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İsim</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınız Soyadınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input placeholder="ornek@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konu</FormLabel>
                      <FormControl>
                        <Input placeholder="Mesajınızın konusu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mesaj</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mesajınızı buraya yazın..." 
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}