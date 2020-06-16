import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameState } from './game-state.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  saveCurrentGameState(gameState: GameState) {
    console.log("Saving GameState");
    return this.http.post<any>('http://localhost:8080/saved-game', gameState);
  }

  loadLastGameState() {
    return this.http.get<GameState>('http://localhost:8080/saved-game');
  }

  setUpNewEasyGame() {
    console.log("set up new easy game");
    return this.http.get<any>('http://localhost:8080/new-cards?gameSize=4');
  }

  setUpNewMediumGame() {
    console.log("set up new medium game");
    return this.http.get<any>('http://localhost:8080/new-cards?gameSize=16');
  }

  setUpNewHardGame() {
    console.log("set up new medium game");
    return this.http.get<any>('http://localhost:8080/new-cards?gameSize=36');
  }
}
