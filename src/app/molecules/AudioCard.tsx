import { useRef, useEffect, useState } from 'react';
import { AppData } from '../models/App';

const AudioCard: React.FC<AppData> = (props: AppData) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Add type for ref
  const [isPlaying, setIsPlaying] = useState(false); // Track audio state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(
        `${process.env.NEXT_PUBLIC_IMG_URL}${props.audio?.url}`
      );

      // Ensure audio stops when it ends
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [props.audio?.url]);

  const togglePlayStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="w-full p-4 flex flex-col justify-center"
      style={{
        backgroundColor: props.audio?.color,
      }}
    >
      <p className="text-2xl mb-1 font-bold">{props.audio?.title}</p>
      {props.audio?.description && (
        <p
          className="mb-1 text-sm"
          dangerouslySetInnerHTML={{ __html: props.audio?.description }}
        />
      )}
      {props.audio?.btncolor && (
        <button
          className="px-2 py-1 mt-2"
          onClick={togglePlayStop}
          style={{
            backgroundColor: props.audio?.btncolor,
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      )}
    </div>
  );
};

export default AudioCard;
