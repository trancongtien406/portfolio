import Image from "next/image";
import { useRef, useState } from "react";
import { rentalTabs } from "./constants";
import type { RentalTab } from "./types";

type HeaderProps = {
  activeTab: RentalTab;
  onSwitchTab: (tab: RentalTab) => void;
  imgError: boolean;
  setImgError: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
};

export function Header({
  activeTab,
  onSwitchTab,
  imgError,
  setImgError,
  location,
  setLocation,
}: HeaderProps) {
  // State và ref cho audio player đơn giản
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const SONG = {
    src: "/uploads/music.mp3", // Đổi đường dẫn mp3 tại đây
    title: "Bài hát mẫu - Sample Song"
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onEnded = () => setPlaying(false);

  return (
    <header className="sticky top-4 z-20 neo-card bg-[var(--neo-secondary)] px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <div className="flex shrink-0 items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden bg-[var(--neo-ink)] neo-hard-shadow-sm">
            {!imgError ? (
              <Image
                src="/profile.jpg"
                alt="Trần Công Tiến"
                fill
                sizes="40px"
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--neo-bg-cream)] sm:text-base">
                TC
              </span>
            )}
          </div>
          {/* Nút play mp3 đơn giản */}
          <button
            onClick={togglePlay}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-black bg-[var(--neo-accent)] text-black shadow-[4px_4px_0px_0px_#000] transition-transform duration-100 active:translate-y-1 active:shadow-none"
            aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}
            title={SONG.title}
          >
            {playing ? (
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect x="5" y="5" width="6" height="18" rx="2" fill="black"/><rect x="17" y="5" width="6" height="18" rx="2" fill="black"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><polygon points="6,4 24,14 6,24" fill="black"/></svg>
            )}
            <audio
              ref={audioRef}
              src={SONG.src}
              onEnded={onEnded}
              preload="auto"
            />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 justify-center overflow-x-auto pb-1 md:overflow-visible md:pb-0">
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--neo-bg-cream)] px-1 py-1 neo-hard-shadow-sm sm:gap-2">
            {rentalTabs.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onSwitchTab(tab)}
                  className={[
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-150 sm:px-4 sm:text-xs",
                    isActive
                      ? "bg-[var(--neo-ink)] text-[var(--neo-bg-cream)]"
                      : "bg-[var(--neo-secondary)] text-[var(--neo-ink)] hover:bg-[var(--neo-accent)]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <div className="hidden max-w-xs items-center gap-2 truncate neo-pill bg-[var(--neo-bg-cream)] px-3 py-1.5 md:flex">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em]">
              Nơi làm việc
            </span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              aria-label="Nơi làm việc"
              className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold text-[var(--neo-ink)] outline-none sm:text-base"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
