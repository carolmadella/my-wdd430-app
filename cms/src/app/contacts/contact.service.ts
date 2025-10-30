import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactListChangedEvent: Subject<Contact[]> = new Subject();
  
  contacts:Contact[] = [];

  maxContactId: number;
    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
     }

getContacts(): Contact[] {
  return this.contacts.slice();
}

getMaxId(): number{
    let maxId = 0;
    for (let contact of this.contacts){
      let currentId = parseInt (contact.id, 10);
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

getContact(id: string): Contact | null {
  for (let contact of this.contacts){
    if(contact.id === id) {
      return contact;
    }
  }
  return null;
}


addContact(newContact: Contact){
    if(newContact === undefined || newContact === null){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }


updateContact(originalContact:Contact, newContact:Contact){
    if(newContact === undefined || newContact === null ||originalContact === undefined || originalContact === null){
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
   if (pos < 0) {
      return;
   }
newContact.id = originalContact.id;
this.contacts[pos] = newContact;
this.contactListChangedEvent.next(this.contacts.slice());
  }




deleteContact(contact: Contact | null) {
   if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.contactListChangedEvent.next(this.contacts.slice());
}



}


  