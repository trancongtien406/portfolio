import type React from "react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const { ref, visible } = useInView();
  const offset: Record<string, string> = {
    up: "translateY(36px)",
    down: "translateY(-36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offset[direction],
        transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}s, transform .65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const { ref, visible } = useInView(0.3);
  const [count, setCount] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!visible || done.current) return;

    done.current = true;
    const start = performance.now();
    const dur = 1800;

    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function SkillBar({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  const { ref, visible } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="space-y-1 border-4 border-[var(--neo-ink)] bg-[var(--neo-bg-cream)] px-2.5 py-2 neo-hard-shadow-sm"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-black text-[var(--neo-ink)]">{name}</span>
        <span className="tabular-nums font-black text-[var(--neo-ink)]">
          {level}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full border-2 border-[var(--neo-ink)] bg-[var(--neo-white)]">
        <div
          className="skill-bar-fill h-full rounded-full bg-[var(--neo-secondary)]"
          style={{
            width: visible ? `${level}%` : "0%",
            transitionDelay: `${delay}s`,
          }}
        />
      </div>
    </div>
  );
}
