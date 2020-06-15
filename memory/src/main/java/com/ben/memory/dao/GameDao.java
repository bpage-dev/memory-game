package com.ben.memory.dao;

import com.ben.memory.model.GameState;
import org.springframework.stereotype.Component;

@Component
public class GameDao {
    // mock database storage
    static private GameState gameState;

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }

}
