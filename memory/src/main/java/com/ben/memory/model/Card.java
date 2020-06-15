package com.ben.memory.model;

import org.springframework.stereotype.Component;

@Component
public class Card {
    private int hiddenValue;

    public Card(int hiddenValue) {
        this.hiddenValue = hiddenValue;
    }

    public Card() {
    }

    public int getHiddenValue() {
        return hiddenValue;
    }

    public void setHiddenValue(int hiddenValue) {
        this.hiddenValue = hiddenValue;
    }
}
