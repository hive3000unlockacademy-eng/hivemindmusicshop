"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CurrentTrack = {
  title: string;
  slug: string;
  previewUrl: string;
};

type AudioContextValue = {
  current: CurrentTrack | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  play: (track: CurrentTrack) => void;
  toggle: () => void;
  seek: (fraction: number) => void;
  pause: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<CurrentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!current || !el) return;
    el.src = current.previewUrl;
    void el
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [current]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      void el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [current, isPlaying]);

  const seek = useCallback((fraction: number) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    el.currentTime = Math.max(0, Math.min(duration, fraction * duration));
  }, [duration]);

  const play = useCallback((track: CurrentTrack) => {
    setCurrent(track);
  }, []);

  const onTimeUpdate = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setProgress(el.currentTime);
    setDuration(el.duration || 0);
  }, []);

  const onEnded = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const value = useMemo(
    () => ({
      current,
      isPlaying,
      progress,
      duration,
      play,
      toggle,
      seek,
      pause,
    }),
    [current, isPlaying, progress, duration, play, toggle, seek, pause],
  );

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        className="hidden"
        preload="metadata"
        crossOrigin="anonymous"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={onEnded}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
