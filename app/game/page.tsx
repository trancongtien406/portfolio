"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Coin = Rect & {
  collected: boolean;
};

type LevelTemplate = {
  start: { x: number; y: number };
  goal: Rect;
  platforms: Rect[];
  hazards: Rect[];
  coins: Rect[];
};

type LevelState = {
  start: { x: number; y: number };
  goal: Rect;
  platforms: Rect[];
  hazards: Rect[];
  coins: Coin[];
};

type GameModel = {
  player: Rect;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  levelIndex: number;
  level: LevelState;
  score: number;
  lives: number;
  running: boolean;
  gameOver: boolean;
  won: boolean;
};

const WIDTH = 960;
const HEIGHT = 600;
const GRAVITY = 1900;
const MOVE_SPEED = 340;
const JUMP_SPEED = 760;
const MAX_DELTA = 0.03;
const MAX_LIVES = 3;

const LEVELS: LevelTemplate[] = [
  {
    start: { x: 42, y: 500 },
    goal: { x: 860, y: 208, width: 52, height: 68 },
    platforms: [
      { x: 0, y: 560, width: 960, height: 40 },
      { x: 120, y: 486, width: 180, height: 24 },
      { x: 372, y: 442, width: 170, height: 24 },
      { x: 612, y: 396, width: 180, height: 24 },
      { x: 760, y: 276, width: 160, height: 24 },
    ],
    hazards: [
      { x: 296, y: 548, width: 78, height: 12 },
      { x: 548, y: 548, width: 74, height: 12 },
    ],
    coins: [
      { x: 185, y: 452, width: 20, height: 20 },
      { x: 442, y: 408, width: 20, height: 20 },
      { x: 685, y: 362, width: 20, height: 20 },
    ],
  },
  {
    start: { x: 42, y: 500 },
    goal: { x: 870, y: 110, width: 52, height: 68 },
    platforms: [
      { x: 0, y: 560, width: 960, height: 40 },
      { x: 102, y: 500, width: 146, height: 24 },
      { x: 286, y: 432, width: 132, height: 24 },
      { x: 472, y: 364, width: 148, height: 24 },
      { x: 658, y: 298, width: 128, height: 24 },
      { x: 820, y: 186, width: 126, height: 24 },
      { x: 624, y: 146, width: 112, height: 24 },
    ],
    hazards: [
      { x: 248, y: 548, width: 92, height: 12 },
      { x: 428, y: 548, width: 96, height: 12 },
      { x: 612, y: 548, width: 102, height: 12 },
    ],
    coins: [
      { x: 156, y: 466, width: 20, height: 20 },
      { x: 334, y: 398, width: 20, height: 20 },
      { x: 525, y: 330, width: 20, height: 20 },
      { x: 702, y: 264, width: 20, height: 20 },
      { x: 856, y: 152, width: 20, height: 20 },
    ],
  },
  {
    start: { x: 28, y: 500 },
    goal: { x: 875, y: 54, width: 52, height: 68 },
    platforms: [
      { x: 0, y: 560, width: 960, height: 40 },
      { x: 118, y: 510, width: 102, height: 20 },
      { x: 278, y: 470, width: 96, height: 20 },
      { x: 432, y: 428, width: 102, height: 20 },
      { x: 596, y: 382, width: 98, height: 20 },
      { x: 756, y: 336, width: 102, height: 20 },
      { x: 832, y: 258, width: 92, height: 20 },
      { x: 684, y: 210, width: 98, height: 20 },
      { x: 534, y: 166, width: 100, height: 20 },
      { x: 390, y: 122, width: 100, height: 20 },
      { x: 744, y: 122, width: 94, height: 20 },
    ],
    hazards: [
      { x: 190, y: 548, width: 72, height: 12 },
      { x: 372, y: 548, width: 72, height: 12 },
      { x: 552, y: 548, width: 72, height: 12 },
      { x: 732, y: 548, width: 72, height: 12 },
    ],
    coins: [
      { x: 308, y: 436, width: 20, height: 20 },
      { x: 460, y: 394, width: 20, height: 20 },
      { x: 624, y: 348, width: 20, height: 20 },
      { x: 783, y: 302, width: 20, height: 20 },
      { x: 709, y: 176, width: 20, height: 20 },
      { x: 566, y: 132, width: 20, height: 20 },
      { x: 772, y: 88, width: 20, height: 20 },
    ],
  },
];

const PLAYER_WIDTH = 36;
const PLAYER_HEIGHT = 52;

function cloneLevel(template: LevelTemplate): LevelState {
  return {
    start: { ...template.start },
    goal: { ...template.goal },
    platforms: template.platforms.map((platform) => ({ ...platform })),
    hazards: template.hazards.map((hazard) => ({ ...hazard })),
    coins: template.coins.map((coin) => ({ ...coin, collected: false })),
  };
}

function buildInitialGame(): GameModel {
  const level = cloneLevel(LEVELS[0]);

  return {
    player: {
      x: level.start.x,
      y: level.start.y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    },
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    levelIndex: 0,
    level,
    score: 0,
    lives: MAX_LIVES,
    running: false,
    gameOver: false,
    won: false,
  };
}

function intersects(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<GameModel>(buildInitialGame());
  const rafRef = useRef<number | null>(null);
  const prevTsRef = useRef<number | null>(null);
  const inputRef = useRef({ left: false, right: false, jumpQueued: false });

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [level, setLevel] = useState(1);
  const [coinsLeft, setCoinsLeft] = useState(LEVELS[0]?.coins.length ?? 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const syncHud = useCallback((model: GameModel) => {
    setScore(model.score);
    setLives(model.lives);
    setLevel(model.levelIndex + 1);
    setCoinsLeft(model.level.coins.filter((coin) => !coin.collected).length);
    setIsRunning(model.running);
    setIsGameOver(model.gameOver);
    setHasWon(model.won);
  }, []);

  const saveHighScore = useCallback((value: number) => {
    setHighScore((prev) => {
      const best = Math.max(prev, value);
      if (best !== prev) {
        try {
          window.localStorage.setItem("neo-adventure-high-score", String(best));
        } catch {
          // Không làm gì nếu localStorage không truy cập được.
        }
      }
      return best;
    });
  }, []);

  const resetCurrentLevel = useCallback((keepScore = true) => {
    const model = gameRef.current;
    const nextLevel = cloneLevel(LEVELS[model.levelIndex] ?? LEVELS[0]);
    model.level = nextLevel;
    model.player.x = nextLevel.start.x;
    model.player.y = nextLevel.start.y;
    model.velocityX = 0;
    model.velocityY = 0;
    model.onGround = false;
    model.running = false;
    if (!keepScore) {
      model.score = 0;
    }
    syncHud(model);
  }, [syncHud]);

  const restartGame = useCallback(() => {
    const next = buildInitialGame();
    gameRef.current = next;
    syncHud(next);
  }, [syncHud]);

  const toggleRunning = useCallback(() => {
    const model = gameRef.current;
    if (model.gameOver || model.won) {
      return;
    }

    model.running = !model.running;
    setIsRunning(model.running);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("neo-adventure-high-score");
      if (saved) {
        const parsed = Number(saved);
        if (Number.isFinite(parsed) && parsed > 0) {
          setHighScore(parsed);
        }
      }
    } catch {
      // Bỏ qua khi localStorage bị chặn.
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (event.key === "ArrowLeft" || key === "a") {
        event.preventDefault();
        inputRef.current.left = true;
      }

      if (event.key === "ArrowRight" || key === "d") {
        event.preventDefault();
        inputRef.current.right = true;
      }

      if (event.key === "ArrowUp" || key === "w" || event.key === " ") {
        event.preventDefault();
        inputRef.current.jumpQueued = true;
      }

      if (key === "p") {
        event.preventDefault();
        toggleRunning();
      }

      if (key === "r") {
        event.preventDefault();
        restartGame();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (event.key === "ArrowLeft" || key === "a") {
        inputRef.current.left = false;
      }

      if (event.key === "ArrowRight" || key === "d") {
        inputRef.current.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [restartGame, toggleRunning]);

  useEffect(() => {
    const loseLife = () => {
      const model = gameRef.current;
      model.lives -= 1;

      if (model.lives <= 0) {
        model.running = false;
        model.gameOver = true;
        model.velocityX = 0;
        model.velocityY = 0;
        saveHighScore(model.score);
        syncHud(model);
        return;
      }

      resetCurrentLevel(true);
    };

    const advanceLevel = () => {
      const model = gameRef.current;
      if (model.levelIndex + 1 >= LEVELS.length) {
        model.running = false;
        model.won = true;
        saveHighScore(model.score);
        syncHud(model);
        return;
      }

      model.levelIndex += 1;
      model.level = cloneLevel(LEVELS[model.levelIndex]);
      model.player.x = model.level.start.x;
      model.player.y = model.level.start.y;
      model.velocityX = 0;
      model.velocityY = 0;
      model.onGround = false;
      model.running = false;
      model.score += 300;
      syncHud(model);
    };

    const update = (dt: number) => {
      const model = gameRef.current;
      if (!model.running || model.gameOver || model.won) {
        return;
      }

      const player = model.player;
      const levelState = model.level;

      let moveDirection = 0;
      if (inputRef.current.left && !inputRef.current.right) {
        moveDirection = -1;
      } else if (inputRef.current.right && !inputRef.current.left) {
        moveDirection = 1;
      }

      model.velocityX = moveDirection * MOVE_SPEED;

      if (inputRef.current.jumpQueued && model.onGround) {
        model.velocityY = -JUMP_SPEED;
        model.onGround = false;
      }
      inputRef.current.jumpQueued = false;

      model.velocityY += GRAVITY * dt;
      model.velocityY = Math.min(model.velocityY, 1200);

      player.x += model.velocityX * dt;
      for (const platform of levelState.platforms) {
        if (!intersects(player, platform)) {
          continue;
        }

        if (model.velocityX > 0) {
          player.x = platform.x - player.width;
        } else if (model.velocityX < 0) {
          player.x = platform.x + platform.width;
        }
      }

      player.x = Math.max(0, Math.min(WIDTH - player.width, player.x));

      player.y += model.velocityY * dt;
      model.onGround = false;
      for (const platform of levelState.platforms) {
        if (!intersects(player, platform)) {
          continue;
        }

        if (model.velocityY > 0) {
          player.y = platform.y - player.height;
          model.velocityY = 0;
          model.onGround = true;
        } else if (model.velocityY < 0) {
          player.y = platform.y + platform.height;
          model.velocityY = 0;
        }
      }

      if (player.y > HEIGHT + 90) {
        loseLife();
        return;
      }

      for (const hazard of levelState.hazards) {
        if (intersects(player, hazard)) {
          loseLife();
          return;
        }
      }

      let touchedCoin = false;
      for (const coin of levelState.coins) {
        if (coin.collected) {
          continue;
        }

        if (intersects(player, coin)) {
          coin.collected = true;
          model.score += 100;
          touchedCoin = true;
        }
      }

      if (touchedCoin) {
        setScore(model.score);
        setCoinsLeft(levelState.coins.filter((coin) => !coin.collected).length);
      }

      const noCoinsLeft = levelState.coins.every((coin) => coin.collected);
      if (noCoinsLeft && intersects(player, levelState.goal)) {
        advanceLevel();
        return;
      }

      setLives(model.lives);
      setLevel(model.levelIndex + 1);
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
      const model = gameRef.current;
      const levelState = model.level;

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#fffdf5";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < HEIGHT; y += 30) {
        for (let x = 0; x < WIDTH; x += 30) {
          ctx.fillRect(x + 6, y + 6, 2, 2);
        }
      }

      for (const platform of levelState.platforms) {
        ctx.fillStyle = "#000";
        ctx.fillRect(platform.x + 6, platform.y + 6, platform.width, platform.height);
        ctx.fillStyle = "#ffd93d";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      }

      for (const hazard of levelState.hazards) {
        ctx.fillStyle = "#000";
        ctx.fillRect(hazard.x + 5, hazard.y + 5, hazard.width, hazard.height);
        ctx.fillStyle = "#ff6b6b";
        ctx.fillRect(hazard.x, hazard.y, hazard.width, hazard.height);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 4;
        ctx.strokeRect(hazard.x, hazard.y, hazard.width, hazard.height);
      }

      for (const coin of levelState.coins) {
        if (coin.collected) {
          continue;
        }

        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(coin.x + coin.width / 2 + 4, coin.y + coin.height / 2 + 4, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#c4b5fd";
        ctx.beginPath();
        ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      const goal = levelState.goal;
      ctx.fillStyle = "#000";
      ctx.fillRect(goal.x + 6, goal.y + 6, goal.width, goal.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(goal.x + 8, goal.y + 8, 14, 14);
      ctx.fillRect(goal.x + 30, goal.y + 24, 14, 14);
      ctx.fillRect(goal.x + 8, goal.y + 40, 14, 14);

      const player = model.player;
      ctx.fillStyle = "#000";
      ctx.fillRect(player.x + 6, player.y + 6, player.width, player.height);
      ctx.fillStyle = "#c4b5fd";
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
      ctx.strokeRect(player.x, player.y, player.width, player.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(player.x + 10, player.y + 14, 6, 6);
      ctx.fillRect(player.x + 22, player.y + 14, 6, 6);

      ctx.lineWidth = 8;
      ctx.strokeStyle = "#000";
      ctx.strokeRect(0, 0, WIDTH, HEIGHT);

      if (!model.running && !model.gameOver && !model.won) {
        ctx.fillStyle = "#000";
        ctx.font = "900 40px var(--font-sans), Space Grotesk, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("NHẤN BẮT ĐẦU ĐỂ PHIÊU LƯU", WIDTH / 2, HEIGHT / 2 - 8);
      }

      if (model.gameOver || model.won) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = model.won ? "#ffd93d" : "#ff6b6b";
        ctx.fillRect(WIDTH / 2 - 230, HEIGHT / 2 - 92, 460, 184);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 6;
        ctx.strokeRect(WIDTH / 2 - 230, HEIGHT / 2 - 92, 460, 184);

        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.font = "900 44px var(--font-sans), Space Grotesk, sans-serif";
        ctx.fillText(model.won ? "BẠN ĐÃ PHÁ ĐẢO" : "GAME OVER", WIDTH / 2, HEIGHT / 2 - 18);
        ctx.font = "700 28px var(--font-sans), Space Grotesk, sans-serif";
        ctx.fillText("NHẤN R ĐỂ CHƠI LẠI", WIDTH / 2, HEIGHT / 2 + 36);
      }
    };

    const loop = (timestamp: number) => {
      const prev = prevTsRef.current ?? timestamp;
      const delta = Math.min((timestamp - prev) / 1000, MAX_DELTA);
      prevTsRef.current = timestamp;

      update(delta);

      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {
        draw(ctx);
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [resetCurrentLevel, saveHighScore, syncHud]);

  const hintText = useMemo(() => {
    if (hasWon) {
      return "Hoàn thành toàn bộ màn chơi, bạn đã phiêu lưu thành công.";
    }

    if (isGameOver) {
      return "Hết mạng rồi, bấm Chơi lại để thử lại từ màn 1.";
    }

    if (isRunning) {
      return "A/D hoặc ←/→ để chạy, W/↑/Space để nhảy, gom hết xu rồi vào cổng.";
    }

    return "Nhấn Bắt đầu hoặc phím P để bắt đầu chuyến phiêu lưu.";
  }, [hasWon, isGameOver, isRunning]);

  return (
    <main className="neo-page min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <header className="neo-shell bg-[var(--neo-secondary)] p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em]">Game 2D Neo-brutalist</p>
          <h1 className="mt-2 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Neo Adventure Quest
          </h1>
          <p className="mt-2 text-sm font-bold sm:text-base">{hintText}</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="neo-shell overflow-hidden bg-white p-3 sm:p-4">
            <canvas
              ref={canvasRef}
              width={WIDTH}
              height={HEIGHT}
              className="block w-full border-4 border-black bg-[var(--neo-bg-cream)]"
              aria-label="Neo Adventure Quest canvas"
              role="img"
            />
          </div>

          <aside className="flex flex-col gap-4">
            <div className="neo-card bg-[var(--neo-muted)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Điểm</p>
              <p className="mt-1 text-4xl font-bold leading-none">{score}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">Điểm cao</p>
              <p className="mt-1 text-2xl font-bold leading-none">{highScore}</p>
            </div>

            <div className="neo-card bg-[var(--neo-secondary)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Màn</p>
              <p className="mt-1 text-3xl font-bold leading-none">
                {level}/{LEVELS.length}
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">Mạng</p>
              <p className="mt-1 text-3xl font-bold leading-none">{lives}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">Xu còn lại</p>
              <p className="mt-1 text-3xl font-bold leading-none">{coinsLeft}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={toggleRunning}
                disabled={isGameOver || hasWon}
                className="neo-button px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRunning ? "Tạm dừng" : "Bắt đầu"}
              </button>

              <button
                type="button"
                onClick={restartGame}
                className="border-4 border-black bg-[var(--neo-secondary)] px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] shadow-[6px_6px_0_0_#000] transition-transform duration-100 ease-linear active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                Chơi lại
              </button>
            </div>

            <div className="neo-card-cream p-4 text-sm font-bold leading-relaxed">
              <p className="uppercase tracking-[0.2em]">Phím tắt</p>
              <p className="mt-2">A/D hoặc ←/→: Di chuyển</p>
              <p>W hoặc ↑ hoặc Space: Nhảy</p>
              <p>P: Bắt đầu/Tạm dừng</p>
              <p>R: Chơi lại</p>
            </div>
          </aside>
        </div>

        <div className="neo-card bg-[var(--neo-accent)] p-4 sm:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">Điều khiển cảm ứng</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <button
              type="button"
              onPointerDown={() => {
                inputRef.current.left = true;
              }}
              onPointerUp={() => {
                inputRef.current.left = false;
              }}
              onPointerLeave={() => {
                inputRef.current.left = false;
              }}
              className="border-4 border-black bg-[var(--neo-secondary)] px-2 py-4 text-sm font-bold uppercase tracking-[0.14em] shadow-[6px_6px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              ← Trái
            </button>

            <button
              type="button"
              onClick={() => {
                inputRef.current.jumpQueued = true;
                const model = gameRef.current;
                if (!model.running && !model.gameOver && !model.won) {
                  model.running = true;
                  setIsRunning(true);
                }
              }}
              className="border-4 border-black bg-[var(--neo-muted)] px-2 py-4 text-sm font-bold uppercase tracking-[0.14em] shadow-[6px_6px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Nhảy
            </button>

            <button
              type="button"
              onPointerDown={() => {
                inputRef.current.right = true;
              }}
              onPointerUp={() => {
                inputRef.current.right = false;
              }}
              onPointerLeave={() => {
                inputRef.current.right = false;
              }}
              className="border-4 border-black bg-[var(--neo-secondary)] px-2 py-4 text-sm font-bold uppercase tracking-[0.14em] shadow-[6px_6px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              Phải →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
