package com.ben.memory.model;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameState {
    private int score;
    private List<Card> cards;
    public int gameSize;
    public Integer[] hiddenValues;
    public String[] shownValues;
    public Boolean[] isDisabled;
    public Boolean[] stillInPlay;

    public GameState(int gameSize) {
        this.hiddenValues = new Integer[gameSize];
        this.shownValues = new String[gameSize];
        this.isDisabled = new Boolean[gameSize];
        this.stillInPlay = new Boolean[gameSize];
        for (int i = 0; i < gameSize; i++) {
            this.shownValues[i] = "?";
            this.isDisabled[i] = false;
            this.stillInPlay[i] = true;
        }
    }

    public GameState() {}

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
        for (int i = 0; i < gameSize; i++) {
            this.hiddenValues[i] = cards.get(i).getHiddenValue();
        }
    }
}
