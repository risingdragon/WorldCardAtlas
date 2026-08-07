export const SCOPA_TABLE = [1, 7, 4];
export const SCOPA_HAND = [1, 5, 7];
export function canCapture(table: number[], value: number) {
  const search = (cards: number[], target: number, start = 0): boolean => {
    if (target === 0) return true;
    return cards.some((card, index) => index >= start && card <= target && search(cards, target - card, index + 1));
  };
  return search(table, value);
}
