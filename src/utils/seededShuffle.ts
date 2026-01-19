import { mulberry32 } from "./seededRandom";

export const seededShuffle = <T,>(items: T[], seed: number): T[] => {
  const rng = mulberry32(seed);
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
