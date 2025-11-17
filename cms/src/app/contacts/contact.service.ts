import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter();
  contactListChangedEvent: Subject<Contact[]> = new Subject();
  
  contacts:Contact[] = [];

  maxContactId: number = 0;
    constructor(private readonly httpClient: HttpClient
          ) {
              
              this.httpClient.get<Contact[]>('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/contacts.json')
              .subscribe ({
                next:(Contacts)=>{
                this.contacts = Contacts;
                
                this.maxContactId = this.getMaxId();
                this.contacts.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
                this.contactListChangedEvent.next(this.contacts.slice())
              },
              error:(error:any)=>{
                console.error(error);
              }
          });

        }
storeContacts(){
    const contactsJson: string = JSON.stringify(this.contacts);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.put('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/contacts.json',contactsJson, { headers: httpHeaders })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

getContacts(): Contact[] {
  return this.contacts.slice();
}

getMaxId(): number{
    let maxId = 0;
    for (let contact of this.contacts){
      let currentId = parseInt(contact.id, 10);
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
    this.storeContacts();
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
this.storeContacts();
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
   this.storeContacts();
}



}


  