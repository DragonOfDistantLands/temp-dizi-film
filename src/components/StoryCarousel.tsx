import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { AspectRatio } from './ui/aspect-ratio';
import ReactPlayer from 'react-player/lazy';

interface Story {
  id: number;
  title: string;
  poster: string;
  trailer: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "Breaking Bad",
    poster: "https://source.unsplash.com/random/150x150?tv-1",
    trailer: "https://www.youtube.com/watch?v=HhesaQXLuRY"
  },
  {
    id: 2,
    title: "The Crown",
    poster: "https://source.unsplash.com/random/150x150?tv-2",
    trailer: "https://www.youtube.com/watch?v=JWtnJjn6ng0"
  },
  {
    id: 3,
    title: "The Last of Us",
    poster: "https://source.unsplash.com/random/150x150?tv-3",
    trailer: "https://www.youtube.com/watch?v=uLtkt8BonwM"
  },
  {
    id: 4,
    title: "House of the Dragon",
    poster: "https://source.unsplash.com/random/150x150?tv-4",
    trailer: "https://www.youtube.com/watch?v=DotnJ7tTA34"
  },
  {
    id: 5,
    title: "Better Call Saul",
    poster: "https://source.unsplash.com/random/150x150?tv-5",
    trailer: "https://www.youtube.com/watch?v=HN4oydykJFc"
  },
  {
    id: 6,
    title: "True Detective",
    poster: "https://source.unsplash.com/random/150x150?tv-6",
    trailer: "https://www.youtube.com/watch?v=YpUznQds8p4"
  },
  {
    id: 7,
    title: "The Bear",
    poster: "https://source.unsplash.com/random/150x150?tv-7",
    trailer: "https://www.youtube.com/watch?v=y-cqqAJIXhs"
  },
  {
    id: 8,
    title: "Succession",
    poster: "https://source.unsplash.com/random/150x150?tv-8",
    trailer: "https://www.youtube.com/watch?v=OzYxJV_rmE8"
  },
  {
    id: 9,
    title: "The Mandalorian",
    poster: "https://source.unsplash.com/random/150x150?tv-9",
    trailer: "https://www.youtube.com/watch?v=aOC8E8z_ifw"
  }
];

export default function StoryCarousel() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  return (
    <div className="w-full mx-auto overflow-x-auto">
      <div className="flex justify-start md:justify-center gap-4 py-4 px-4 min-w-max">
        {stories.map((story) => (
          <Dialog key={story.id}>
            <DialogTrigger asChild>
              <button
                className="flex flex-col items-center focus:outline-none group"
                onClick={() => setActiveStory(story)}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-primary p-0.5 bg-card hover:ring-4 transition-all duration-200">
                  <img
                    src={story.poster}
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="text-xs text-center mt-2 truncate w-16 md:w-20 text-muted-foreground group-hover:text-primary transition-colors">
                  {story.title}
                </p>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90vw] md:max-w-[850px] p-0 bg-background/95 backdrop-blur-sm">
              <DialogTitle className="sr-only">{story.title} Fragman</DialogTitle>
              <AspectRatio ratio={16/9}>
                <ReactPlayer
                  url={story.trailer}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0
                      }
                    }
                  }}
                />
              </AspectRatio>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}