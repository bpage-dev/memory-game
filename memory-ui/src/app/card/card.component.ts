import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() cardNumber: number;
  @Input() shownValue: string;
  @Input() hiddenValue: number;
  @Input() isDisabled: boolean;
  @Output() clickedEvent = new EventEmitter<object>();
  isFlipped: any;


  sendClickedEvent() {
    console.log("emit cardnumber: " + this.cardNumber)
    this.clickedEvent.emit({hiddenValue: this.hiddenValue, cardNumber: this.cardNumber});
  }

  ngOnInit(): void {
   
  }

}
