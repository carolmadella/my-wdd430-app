import { Component } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'

})
export class ContactsComponent {

  selectedContact: Contact | undefined;  
}
