import { useEffect, useRef, useState } from 'react';
import type { MantraId } from '../data/mantras';

// Аудио подхватывается автоматически, когда файл появляется в src/assets/
const AUDIO_URLS = import.meta.glob('../assets/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function audioUrlFor(id: MantraId): string | undefined {
  return AUDIO_URLS[`../assets/${id === 'opening' ? 'opening-mantra' : 'closing-mantra'}.mp3`];
}

export function MantraAudioButton({ id }: { id: MantraId }) {
  const url = audioUrlFor(id);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [id]);

  if (!url) return null;

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio(url);
      audio.addEventListener('ended', () => setPlaying(false));
      audioRef.current = audio;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      void audioRef.current.play().catch(() => {
        audioRef.current = null;
        setPlaying(false);
      });
    }
  };

  return (
    <button type="button" className="sheet__practice" onClick={toggle}>
      {playing ? '⏸ Пауза' : '▶ Слушать мантру'}
    </button>
  );
}
