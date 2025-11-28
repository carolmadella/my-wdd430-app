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

    constructor(private readonly httpClient: HttpClient
          ) {
              
            this.httpClient.get<{contacts: Contact[]}>('http://localhost:3000/contacts')
              .subscribe ({
                next:(result)=>{
                this.contacts = result.contacts;

                this.sortAndSend();
              },
              error:(error:any)=>{
                console.error(error);
              }
          });

        }

getContacts(): Contact[] {
  return this.contacts.slice();
}


getContact(id: string): Contact | null {
  for (let contact of this.contacts){
    if(contact.id === id) {
      return contact;
    }
  }
  return null;
}


addContact(contact: Contact) {
  if (!contact) {
    return;
  }
  contact.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  this.httpClient.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
}


updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(c => c.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  newContact.id = originalContact.id;
  newContact._id = originalContact._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  this.httpClient.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe(
      () => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
}




deleteContact(contact: Contact | null) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c=> c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

private sortAndSend(): void {
  this.contacts.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
  this.contactListChangedEvent.next(this.contacts.slice())
}



}


  