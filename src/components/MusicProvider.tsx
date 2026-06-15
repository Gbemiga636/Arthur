"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { MUSIC_START_SECONDS } from "@/lib/constants";

interface MusicContextValue {
  isPlaying: boolean;
  playMusic: () => void;
  stopMusic: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequestRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const requestId = ++playRequestRef.current;

    if (audio.currentTime < MUSIC_START_SECONDS) {
      audio.currentTime = MUSIC_START_SECONDS;
    }

    void audio
      .play()
      .then(() => {
        if (requestId !== playRequestRef.current || audio.paused) return;
        setIsPlaying(true);
      })
      .catch(() => {});
  }, []);

  const stopMusic = useCallback(() => {
    playRequestRef.current += 1;
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }
    audio.pause();
    audio.currentTime = MUSIC_START_SECONDS;
    setIsPlaying(false);
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, playMusic, stopMusic }}>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
