import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent: Subject<Message[]> = new Subject();

  messages:Message[] = [];
  
  
        constructor(private readonly httpClient: HttpClient) {
            this.httpClient.get<{messages: Message[]}>('http://localhost:3000/messages')
                      .subscribe ({
                        next:(result)=>{
                        this.messages = result.messages;
                        this.sortAndSend();
                      },
                      error:(error:any)=>{
                        console.error(error);
                      }
                  });
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

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.post<{ message: string, createdMessage: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.createdMessage);
          this.sortAndSend();
        }
      );
  }

  private sortAndSend(): void {
    this.messages.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
    this.messageChangedEvent.next(this.messages.slice())
  }



}
