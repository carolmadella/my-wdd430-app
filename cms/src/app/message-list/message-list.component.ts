import { Component } from '@angular/core';
import { Message } from '../models/message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
messages: Message[] = [];

constructor(
      private readonly messageService: MessageService,

    ){}

ngOnInit(): void {
  this.messages = this.messageService.getMessages();
       this.messageService.messageChangedEvent.subscribe(
        (messages:Message[]) => this.messages = messages
       )
      }

onAddMessage(message: Message){
  this.messages.unshift(message);
}
}
