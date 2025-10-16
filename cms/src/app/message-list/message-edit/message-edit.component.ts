import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  currentSender: string = 'Carolina';

  @Output() addMessageEvent:EventEmitter<Message> = new EventEmitter();

  @ViewChild('subject') subjectRef!: ElementRef;

  @ViewChild('msgText') msgTextRef!: ElementRef;


  onClear(){
   this.subjectRef.nativeElement.value = '';
   this.msgTextRef.nativeElement.value = '';
  }
  onSendMessage(){
   
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const message = new Message('5',subject,msgText,this.currentSender);

    this.addMessageEvent.emit(message);
  }
}
