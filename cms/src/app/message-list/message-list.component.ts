import { Component } from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
messages: Message[] = [
  new Message(
    '1',
    'Test',
    'This is a Test',
    'Carolina',
  ),
  new Message(
    '2',
    'Test2',
    'This is a Second Test',
    'Carolina',
  ),
  new Message(
    '3',
    'Test3',
    'This is a third Test',
    'Carolina',
  )
];

onAddMessage(message: Message){
  this.messages.unshift(message);
}
}
