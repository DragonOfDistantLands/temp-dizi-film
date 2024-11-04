import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface CommentsProps {
  contentId: string;
  contentType: 'series' | 'movie';
}

export function Comments({ contentId, contentType }: CommentsProps) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState('');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Yorumları çek
  const [comments] = useCollection(
    query(
      collection(db, `${contentType}_comments`),
      orderBy('createdAt', 'desc')
    )
  );

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `${contentType}_comments`), {
        contentId,
        text: comment.trim(),
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setComment('');
      toast({
        title: "Başarılı",
        description: "Yorumunuz paylaşıldı.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yorumunuz paylaşılırken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Yorumlar</h2>

      {/* Yorum Yapma Formu */}
      <Card className="p-4 mb-8">
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.displayName}</p>
                <button 
                  onClick={() => auth.signOut()} 
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Yorumunuzu yazın..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                {isSubmitting ? "Paylaşılıyor..." : "Paylaş"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Yorum yapmak için Google hesabınızla giriş yapın
            </p>
            <Button onClick={handleSignIn} variant="outline">
              Google ile Giriş Yap
            </Button>
          </div>
        )}
      </Card>

      {/* Yorumlar Listesi */}
      <div className="space-y-4">
        {comments?.docs.map((doc) => {
          const data = doc.data();
          return (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={data.userPhoto} />
                  <AvatarFallback>{data.userName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{data.userName}</p>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(data.createdAt?.toDate(), { 
                        addSuffix: true,
                        locale: tr 
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{data.text}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}