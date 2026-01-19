import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import CardGrid from "./components/CardGrid";
import Controls from "./components/Controls";
import Toast from "./components/Toast";
import { cards } from "./data/cards";
import { seededShuffle } from "./utils/seededShuffle";
import { readPickedFromUrl, readSeedFromUrl, setUrlState } from "./utils/urlState";

const initialSeedFromUrl = readSeedFromUrl();
const initialSeed = initialSeedFromUrl ?? Date.now();
const initialPickedFromUrl = readPickedFromUrl();
const initialPickedIsValid =
  initialPickedFromUrl !== null && cards.some((card) => card.id === initialPickedFromUrl);

const sparklePositions = [
  { x: -80, y: -40 },
  { x: 90, y: -30 },
  { x: -110, y: 20 },
  { x: 110, y: 30 },
  { x: -70, y: 90 },
  { x: 70, y: 100 },
  { x: 0, y: -110 },
  { x: 0, y: 120 }
];

const App = () => {
  const [seed, setSeed] = useState<number>(initialSeed);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(
    () => new Set(initialPickedIsValid ? [initialPickedFromUrl!] : [])
  );
  const [firstPickedId, setFirstPickedId] = useState<string | null>(
    initialPickedIsValid ? initialPickedFromUrl : null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sparkleKey, setSparkleKey] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const shuffledCards = useMemo(() => seededShuffle(cards, seed), [seed]);
  const totalCards = cards.length;
  const revealedCount = revealedIds.size;
  const allRevealed = revealedCount === totalCards;
  const firstPickedTitle = firstPickedId
    ? cards.find((card) => card.id === firstPickedId)?.title ?? null
    : null;

  useEffect(() => {
    if (!initialSeedFromUrl) {
      setUrlState({ seed: initialSeed, picked: initialPickedIsValid ? initialPickedFromUrl : null });
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  const handleReveal = (id: string) => {
    setRevealedIds((prev) => {
      if (prev.has(id)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    if (!firstPickedId) {
      setFirstPickedId(id);
      setSparkleKey((value) => value + 1);
      setUrlState({ seed, picked: id });
    }
  };

  const handleRevealAll = () => {
    setRevealedIds(new Set(cards.map((card) => card.id)));
  };

  const handleShuffle = () => {
    const nextSeed = Date.now();
    setSeed(nextSeed);
    setRevealedIds(new Set());
    setFirstPickedId(null);
    setUrlState({ seed: nextSeed, picked: null });
  };

  const handleCopyLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("seed", String(seed));

    if (firstPickedId) {
      url.searchParams.set("picked", firstPickedId);
    } else {
      url.searchParams.delete("picked");
    }

    const shareLink = url.toString();

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareLink);
        setToastMessage("Copied!");
        return;
      } catch {
        setToastMessage("Unable to copy");
        return;
      }
    }

    window.prompt("Copy this link:", shareLink);
    setToastMessage("Link ready");
  };

  return (
    <div className="relative min-h-screen text-slate-800">
      <div className="ambient-orbs" aria-hidden="true" />
      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="rounded-3xl border border-white/60 bg-white/50 px-6 py-8 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10">
          <header className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Lucky Gift Card</p>
            <h1 className="mt-2 font-display text-3xl text-slate-800 sm:text-4xl md:text-5xl">
              Lucky Gift Card 💌
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Pick a mystery card and reveal your surprise.
            </p>
          </header>

          <section className="mt-6 sm:mt-8">
            <Controls
              onShuffle={handleShuffle}
              onRevealAll={handleRevealAll}
              onCopyLink={handleCopyLink}
              allRevealed={allRevealed}
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm">
                Revealed {revealedCount}/{totalCards}
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm">Seed {seed}</span>
              <span className="rounded-full bg-white/70 px-3 py-1 shadow-sm">
                {firstPickedTitle ? `First pick: ${firstPickedTitle}` : "First pick: —"}
              </span>
            </div>
          </section>

          <section className="relative mt-8" aria-label="Gift cards">
            {sparkleKey > 0 && !prefersReducedMotion && (
              <div key={sparkleKey} className="sparkle-burst" aria-hidden="true">
                {sparklePositions.map((sparkle, index) => (
                  <span
                    key={index}
                    className="sparkle"
                    style={{
                      "--tx": `${sparkle.x}px`,
                      "--ty": `${sparkle.y}px`
                    } as CSSProperties}
                  />
                ))}
              </div>
            )}
            <CardGrid
              cards={shuffledCards}
              revealedIds={revealedIds}
              firstPickedId={firstPickedId}
              onReveal={handleReveal}
            />
          </section>
        </div>
      </main>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default App;
