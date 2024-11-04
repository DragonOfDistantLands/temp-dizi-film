import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export function AdminProfile() {
  return (
    <Card className="mt-8 p-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://source.unsplash.com/random/100x100?portrait" alt="Admin" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">İçerik Editörü | Dizi ve Film Tutkunu</p>
        </div>
      </div>
    </Card>
  );
}