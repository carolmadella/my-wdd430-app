import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  messages:Message[] = [];
        constructor() {
            this.messages = MOCKMESSAGES;
         }
    
    getMessages(): Message[] {
      return this.messages.slice();
    }
    
    getMessage(id: string): Message | null {
      for (let message of this.messages){
        if(message.id === id) {
          return message;
        }
      }
      return null;
    }

    addMessage(message: Message){
      this.messages.push(message);
      this.messageChangedEvent.emit(this.getMessages());
    }


}
