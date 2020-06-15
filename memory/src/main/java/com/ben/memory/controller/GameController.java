package com.ben.memory.controller;

import com.ben.memory.model.GameState;
import com.ben.memory.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    @Autowired
    GameService gameService;

    // GET: runs logic to create and return new cards based on numerical parameter (# of cards aka size of game)
    @GetMapping("/new-cards")
    public GameState newGame(@RequestParam Integer gameSize) {
        gameService.createNewGameState(gameSize);
        return gameService.getLatestGameState();
    }

    // POST: passes string param representing current game save to be "saved" (could be saved to db irl)
    @PostMapping("/saved-game")
    public void saveGame(@RequestBody GameState gameState) {
        System.out.println("/saved-game");
        gameService.setLatestGameState(gameState);
    }

    // GET: retrieves current string representing latest game save (for opening/loading a game on another device)
    @GetMapping("/saved-game")
    public GameState loadGame() {
        return gameService.getLatestGameState();
    }

    // GET: retrieves list of high scores

    // POST: add a new high score

}