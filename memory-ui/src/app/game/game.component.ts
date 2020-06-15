import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Card } from '../card.model';
import { JsonpClientBackend } from '@angular/common/http';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { GameState } from '../game-state.model';
import { BP_PREFIX } from 'blocking-proxy/built/lib/blockingproxy';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // How many cards we are playing with
  gameSize: number;
  // Incoming/outgoing gamestate for save process
  gameState: GameState;
  currentScore: number;

  // Used to track info about each button via index
  hiddenValues = [];
  shownValues = [];
  isDisabled = [];
  stillInPlay = [];

  // Used to track if we are selecting our first or second button this turn
  firstSelection = true;

  // The buttons being selected (contain both their cardNumber (which button) and their hiddenValue)
  currentSelections = [];

  // for tracking this clicked button
  clickedButton: any;

  constructor(private dataService: DataService) { }
  ngOnInit() {
    console.log('Game Screen Init');
  }

  // Disable the button we clicked, then handle first/second button logic
  async receiveClickEvent($event) {
    this.clickedButton = $event;
    this.isDisabled[this.clickedButton.cardNumber] = true;
    if (this.firstSelection) {
      this.firstSelection = false;
      this.currentSelections[0] = this.clickedButton;
      this.shownValues[this.clickedButton.cardNumber] = this.hiddenValues[this.clickedButton.cardNumber]
    } else {
      this.currentSelections[1] = this.clickedButton;
      this.shownValues[this.clickedButton.cardNumber] = this.hiddenValues[this.clickedButton.cardNumber]
      for (let i = 0; i < this.isDisabled.length; i++) {
        if (i != this.currentSelections[0].cardNumber && i != this.currentSelections[1].cardNumber) {
          this.isDisabled[i] = true;
        }
      }
      await new Promise(resolve => setTimeout(()=>resolve(), 3000)).then(()=>{});
      console.log("compare: " + JSON.stringify(this.currentSelections))
      this.finishTurn();
    }
  }

  finishTurn() {
    this.currentScore++;
    this.firstSelection = true;
    // Disable all the other buttons (temporarily)
    for (let i = 0; i < this.isDisabled.length; i++) {
      if (i != this.currentSelections[0].cardNumber && i != this.currentSelections[1].cardNumber) {
        this.isDisabled[i] = false;
      }
    }
    // If it is a match, 'confirm' these buttons, keeping them out of play
    if (this.currentSelections[0].hiddenValue === this.currentSelections[1].hiddenValue) {
      this.confirmSelections();
    } else {
      // Otherwise, reset the buttons
      this.resetSelections();
    }
  }

  confirmSelections() {
    this.stillInPlay[this.currentSelections[0].cardNumber] = false;
    this.stillInPlay[this.currentSelections[1].cardNumber] = false;
    // Check to see if all buttons are confirmed, signaling the game is over
    let gameOver = true;
    for (let i = 0; i < this.stillInPlay.length; i++) {
      if (this.stillInPlay[i] === true) {
        gameOver = false;
      }
    }
    if (gameOver === true) {
      alert("You win! Turn total: " + this.currentScore);
    }
  }

  resetSelections() {
    this.shownValues[this.currentSelections[0].cardNumber] = '?';
    this.shownValues[this.currentSelections[1].cardNumber] = '?';
    this.isDisabled[this.currentSelections[0].cardNumber] = false;
    this.isDisabled[this.currentSelections[1].cardNumber] = false;
  }

  newEasyGame() {
    console.log("new game!");
    this.dataService.setUpNewEasyGame()
    .subscribe(cards => {
      this.gameSize = 4;
      this.gameState = cards;
      for (let i = 0; i < this.gameState.cards.length; i++) {
        this.hiddenValues[i] = this.gameState.cards[i].hiddenValue;
        this.shownValues[i] = '?';
        this.isDisabled[i] = false;
        this.stillInPlay[i] = true;
      }
      this.currentScore = 0;
      console.log("newGame in game.component: " + JSON.stringify(this.gameState));
    });
  }

  newMediumGame() {
    console.log("new game!");
    this.dataService.setUpNewMediumGame()
    .subscribe(cards => {
      this.gameSize = 16;
      this.gameState = cards;
      for (let i = 0; i < this.gameState.cards.length; i++) {
        this.hiddenValues[i] = this.gameState.cards[i].hiddenValue;
        this.shownValues[i] = '?';
        this.isDisabled[i] = false;
        this.stillInPlay[i] = true;
      }
      this.currentScore = 0;
      console.log("newGame in game.component: " + JSON.stringify(this.gameState));
    });
  }

  newHardGame() {
    console.log("new game!");
    this.dataService.setUpNewHardGame()
    .subscribe(cards => {
      this.gameSize = 36;
      this.gameState = cards;
      for (let i = 0; i < this.gameState.cards.length; i++) {
        this.hiddenValues[i] = this.gameState.cards[i].hiddenValue;
        this.shownValues[i] = '?';
        this.isDisabled[i] = false;
        this.stillInPlay[i] = true;
      }
      this.currentScore = 0;
      console.log("newGame in game.component: " + JSON.stringify(this.gameState));
    });
  }

  saveGame() {
    this.gameState.hiddenValues = this.hiddenValues;
    this.gameState.shownValues = this.shownValues;
    this.gameState.isDisabled = this.isDisabled;
    this.gameState.stillInPlay = this.stillInPlay;
    this.gameState.score = this.currentScore;
    this.gameState.gameSize = this.gameSize;

    console.log("saving gamestate: " + JSON.stringify(this.gameState));
    this.dataService.saveCurrentGameState(this.gameState)
    .subscribe(message => {
      console.log("returned message: " + message)
    });
  }

  loadGame() {
    return this.dataService.loadLastGameState()
    .subscribe(gameState => {
      this.gameState = gameState;
      console.log("loading gamestate: " + JSON.stringify(gameState));
      this.hiddenValues = this.gameState.hiddenValues;
      this.shownValues = this.gameState.shownValues;
      this.isDisabled = this.gameState.isDisabled;
      this.stillInPlay = this.gameState.stillInPlay;
      this.currentScore = this.gameState.score;
      this.gameSize = this.gameState.gameSize;
    })
  }
}
