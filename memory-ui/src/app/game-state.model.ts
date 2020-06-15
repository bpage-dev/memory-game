import { Card } from './card.model';

export class GameState {
  gameSize: number;
  score: number;
  cards: Card[];
  hiddenValues = [];
  shownValues = [];
  isDisabled = [];
  stillInPlay = [];
}
