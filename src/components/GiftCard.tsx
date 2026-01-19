import type { Card } from "../data/cards";

type GiftCardProps = {
  card: Card;
  index: number;
  isRevealed: boolean;
  isFirstPicked: boolean;
  onReveal: (id: string) => void;
};

const GiftCard = ({ card, index, isRevealed, isFirstPicked, onReveal }: GiftCardProps) => {
  const label = isRevealed
    ? `Revealed card ${index + 1}. ${card.title}.`
    : `Mystery card ${index + 1}. Press to reveal.`;

  return (
    <button
      type="button"
      className={`card card-shell relative h-44 w-full rounded-3xl text-left shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 sm:h-52 ${
        isFirstPicked ? "ring-2 ring-rose-300 shadow-glow" : ""
      } ${isRevealed ? "revealed" : ""}`}
      onClick={() => onReveal(card.id)}
      aria-pressed={isRevealed}
      aria-label={label}
    >
      <div className="card-inner">
        <div className="card-face card-back card-pattern flex h-full flex-col items-center justify-center gap-2 rounded-3xl border border-white/50 p-4 text-center text-white">
          <span className="text-2xl">💗</span>
          <p className="text-sm font-semibold uppercase tracking-wide">Tap to reveal</p>
        </div>
        <div className="card-face card-front flex h-full flex-col items-start justify-between rounded-3xl border border-white/60 bg-white/80 p-4 text-left text-slate-700 shadow-inner">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-400">{card.title}</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">{card.message}</p>
          </div>
          <span className="text-2xl">{card.emoji}</span>
        </div>
      </div>
    </button>
  );
};

export default GiftCard;
