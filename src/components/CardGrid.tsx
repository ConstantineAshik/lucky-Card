import type { Card } from "../data/cards";
import GiftCard from "./GiftCard";

type CardGridProps = {
  cards: Card[];
  revealedIds: Set<string>;
  firstPickedId: string | null;
  onReveal: (id: string) => void;
};

const CardGrid = ({ cards, revealedIds, firstPickedId, onReveal }: CardGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, index) => (
        <GiftCard
          key={card.id}
          card={card}
          index={index}
          isRevealed={revealedIds.has(card.id)}
          isFirstPicked={firstPickedId === card.id}
          onReveal={onReveal}
        />
      ))}
    </div>
  );
};

export default CardGrid;
