import { NgModule } from '@angular/core';

import { CardComponent } from '../card/card.component';
import { GameComponent } from './game.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
   GameComponent,
   CardComponent
  ],
  imports: [
   MatGridListModule,
   MatButtonModule,
   CommonModule
],
  exports: [
   GameComponent,
   CardComponent],
  providers: [],
  bootstrap: []
})
export class GameModule { }
