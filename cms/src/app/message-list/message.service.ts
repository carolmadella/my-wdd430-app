import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent: EventEmitter<Message[]> = new EventEmitter();

  messages:Message[] = [];
  maxMessageId: number = 0;
        constructor(private readonly httpClient: HttpClient) {
            this.httpClient.get<Message[]>('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/messages.json')
                      .subscribe ({
                        next:(messages)=>{
                        this.messages = messages;
                        this.maxMessageId = this.getMaxId();
                        this.messages.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
                        this.messageChangedEvent.emit(this.getMessages());
                      },
                      error:(error:any)=>{
                        console.error(error);
                      }
                  });
         }

        storeMessages(){
            const messagesJson: string = JSON.stringify(this.messages);
            const httpHeaders: HttpHeaders = new HttpHeaders({
              'Content-Type': 'application/json'
            });
            this.httpClient.put('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/messages.json',messagesJson, { headers: httpHeaders })
              .subscribe(() => {
                this.messageChangedEvent.emit(this.getMessages());
                }
              );
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

     getMaxId(): number{
    let maxId = 0;
    for (let message of this.messages){
      let currentId = parseInt(message.id, 10);
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }


    addMessage(message: Message){
       this.maxMessageId++;
    message.id = this.maxMessageId.toString();
      this.messages.push(message);
      this.storeMessages();
    }


}
