package com.ben.memory.service;

import com.ben.memory.dao.GameDao;
import com.ben.memory.model.GameState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    @Autowired
    private GameDao gameDao;

    public GameState getLatestGameState() {
        return gameDao.getGameState();
    }

    public void setLatestGameState(GameState gameState) {
        gameDao.setGameState(gameState);
    }

    public void createNewGameState(int gameSize) {
        // create game state based on user input
        GameState gameState = new GameState(gameSize);
        gameState.setHiddenValues(generateNewCards(gameSize));
        gameState.setScore(0);
        gameState.gameSize = gameSize;
        System.out.println(gameState.getHiddenValues());
        // save new gamestate to "database" using dao
        gameDao.setGameState(gameState);
    }

    private Integer[] generateNewCards(int gameSize) {
        // Create list of hiddenValues
        List<Integer> hiddenValues = new ArrayList<>(gameSize);
        int maxValue = gameSize / 2;
        System.out.println("maxValue: " + maxValue);
        for (int i = 0; i < gameSize; i++) {
            System.out.println("i: " + i);
            if (i < maxValue) {
                hiddenValues.add(i);
                System.out.println("Setting hiddenValues[" + i + "] to " + i);
            } else {
                hiddenValues.add(i - maxValue);
                System.out.println("Setting hiddenValues[" + i + "] to " + (i - maxValue));
            }
        }

        // Shuffle hiddenValues
        Random random = new Random();
        for (int i = 0; i < hiddenValues.size(); i++) {
            int randomIndex = random.nextInt(gameSize - 1);
            // Swap i and randomIndex
            int tempValue = hiddenValues.get(i);
            System.out.println("swapping " + hiddenValues.get(randomIndex) + " and " + tempValue);
            hiddenValues.set(i, hiddenValues.get(randomIndex));
            hiddenValues.set(randomIndex, tempValue);
        }

        Integer[] hiddenValuesArray = new Integer[hiddenValues.size()];
        hiddenValuesArray = hiddenValues.toArray(hiddenValuesArray);

        return hiddenValuesArray;
    }

}
