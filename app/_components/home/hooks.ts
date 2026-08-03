import { useEffect, useState } from "react";

export function useTyping(texts: string[], speed = 70, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = texts[idx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (charIdx < t.length) {
            setDisplay(t.slice(0, charIdx + 1));
            setCharIdx((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), pause);
          }
        } else if (charIdx > 0) {
          setDisplay(t.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      },
      deleting ? 35 : speed,
    );

    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return display;
}
