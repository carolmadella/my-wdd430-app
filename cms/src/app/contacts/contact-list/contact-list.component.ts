import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    private readonly contactService: ContactService,
  ){
    
  }
  ngOnInit(): void {
    this.contacts=this.contactService.getContacts();
  }

onSelected(contact: Contact) {
   this.contactService.contactSelectedEvent.emit(contact);
}
}
