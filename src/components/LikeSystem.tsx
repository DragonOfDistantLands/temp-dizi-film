import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LikeSystemProps {
  contentId: string;
  contentType: 'series' | 'movie';
  title: string;
}

export function LikeSystem({ contentId, contentType, title }: LikeSystemProps) {
  const [user] = useAuthState(auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const { toast } = useToast();

  // Kullanıcının önceki oyunu varsa onu getir
  const checkPreviousVote = async () => {
    if (!user) return;
    
    const voteRef = doc(db, `${contentType}_votes`, `${contentId}_${user.uid}`);
    const voteDoc = await getDoc(voteRef);
    
    if (voteDoc.exists()) {
      setUserVote(voteDoc.data().vote);
    }
  };

  // Component yüklendiğinde önceki oyu kontrol et
  useState(() => {
    checkPreviousVote();
  });

  const handleVote = async (vote: 'like' | 'dislike') => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Oy vermek için giriş yapmalısınız.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const contentRef = doc(db, contentType, contentId);
      const voteRef = doc(db, `${contentType}_votes`, `${contentId}_${user.uid}`);
      const voteDoc = await getDoc(voteRef);
      
      if (voteDoc.exists()) {
        const previousVote = voteDoc.data().vote;
        if (previousVote === vote) {
          // Aynı oya tekrar basılırsa oyu kaldır
          await updateDoc(contentRef, {
            [`${vote}s`]: increment(-1),
            totalVotes: increment(-1)
          });
          await setDoc(voteRef, { vote: null });
          setUserVote(null);
        } else {
          // Farklı oya basılırsa önceki oyu kaldır, yeni oyu ekle
          await updateDoc(contentRef, {
            [`${previousVote}s`]: increment(-1),
            [`${vote}s`]: increment(1)
          });
          await setDoc(voteRef, { vote });
          setUserVote(vote);
        }
      } else {
        // İlk kez oy veriliyorsa
        await updateDoc(contentRef, {
          [`${vote}s`]: increment(1),
          totalVotes: increment(1)
        });
        await setDoc(voteRef, { vote });
        setUserVote(vote);
      }

      toast({
        title: "Başarılı",
        description: "Oyunuz kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Oyunuz kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-xl font-medium text-center mb-4">{title} beğendin mi?</h3>
      <div className="flex justify-center gap-4">
        <Button
          variant={userVote === 'like' ? 'default' : 'outline'}
          size="lg"
          onClick={() => handleVote('like')}
          disabled={isSubmitting}
          className="w-[160px]"
        >
          <ThumbsUp className="mr-2 h-5 w-5" />
          Beğendim
        </Button>
        <Button
          variant={userVote === 'dislike' ? 'default' : 'outline'}
          size="lg"
          onClick={() => handleVote('dislike')}
          disabled={isSubmitting}
          className="w-[160px]"
        >
          <ThumbsDown className="mr-2 h-5 w-5" />
          Beğenmedim
        </Button>
      </div>
    </div>
  );
}