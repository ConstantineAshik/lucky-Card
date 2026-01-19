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
    <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-5" role="list">
      {cards.map((card, index) => (
        <li key={card.id}>
          <GiftCard
            card={card}
            index={index}
            isRevealed={revealedIds.has(card.id)}
            isFirstPicked={firstPickedId === card.id}
            onReveal={onReveal}
          />
        </li>
      ))}
    </ul>
  );
};

export default CardGrid;
