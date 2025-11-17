import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
   let filteredContacts: Contact[] =[];  
   if (!term || term.length === 0) {
     return contacts; 
   }
   filteredContacts = contacts.filter(
         (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
   return filteredContacts;
  }
}
