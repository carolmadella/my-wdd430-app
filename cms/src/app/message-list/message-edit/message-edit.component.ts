import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  constructor(
    private readonly messageService: MessageService
  ){

  }
  currentSender: string = '3';

  @ViewChild('subject') subjectRef!: ElementRef;

  @ViewChild('msgText') msgTextRef!: ElementRef;


  onClear(){
   this.subjectRef.nativeElement.value = '';
   this.msgTextRef.nativeElement.value = '';
  }
  onSendMessage(){
   
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const message = new Message("",subject,msgText,this.currentSender);

    this.messageService.addMessage(message);
    this.onClear();
  }
}
