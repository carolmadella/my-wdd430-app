import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit{
   @Input() message!: Message;
   messageSender: string | undefined;
   constructor(private contactService: ContactService) {}
   ngOnInit() {
      const contact: Contact | null = this.contactService.getContact(this.message.sender);
      this.messageSender = contact?.name;
   }
}