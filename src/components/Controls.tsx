type ControlsProps = {
  onShuffle: () => void;
  onRevealAll: () => void;
  onCopyLink: () => void;
  allRevealed: boolean;
};

const Controls = ({ onShuffle, onRevealAll, onCopyLink, allRevealed }: ControlsProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      <button
        type="button"
        className="rounded-full bg-rose-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
        onClick={onShuffle}
      >
        Shuffle
      </button>
      <button
        type="button"
        className="rounded-full border border-rose-200 bg-white/80 px-6 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onRevealAll}
        disabled={allRevealed}
        aria-disabled={allRevealed}
      >
        Reveal All
      </button>
      <button
        type="button"
        className="rounded-full border border-rose-200 bg-white/80 px-6 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        onClick={onCopyLink}
      >
        Copy Share Link
      </button>
    </div>
  );
};

export default Controls;
