import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'

})
export class ContactsComponent implements OnInit {
  
  selectedContact: Contact | undefined; 
  
  constructor(
      private readonly contactService: ContactService,

    ){}
  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe(
      (contact:Contact) => this.selectedContact = contact
    );
  }
}
