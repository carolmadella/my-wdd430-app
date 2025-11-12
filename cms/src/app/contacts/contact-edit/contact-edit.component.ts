import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {CdkDrag, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
 
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact | null = null ;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string | null = null;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }
  ngOnInit(): void {
   this.route.paramMap.subscribe((params:ParamMap): void => {
           const contactId = params.get('id');
           if (!contactId){
             this.editMode= false;
             return;
           }
           this.originalContact = this.contactService.getContact(contactId);
           if (!this.originalContact){
             return;
           }
           this.editMode= true;
           this.contact= JSON.parse(JSON.stringify(this.originalContact));

           if(this.contact?.group) {
            this.groupContacts= JSON.parse(JSON.stringify(this.contact.group));
           }
         });
  }
  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
  onSubmit(form: NgForm):void{
    const value=  form.value;
    const newContact= new Contact(
      this.contact?.id || '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
   if(this.editMode){
    this.contactService.updateContact(this.originalContact!, newContact);
   }
   else {
    this.contactService.addContact(newContact);
   }
   this.router.navigate(['/contacts']);
  }
  
  isInvalidContact(newContact: Contact): boolean {
  if (!newContact) {
    return true;
  }
  if (this.contact && newContact.id === this.contact.id) {
    return true;
  }
  for (let i = 0; i < this.groupContacts.length; i++) {
    if (newContact.id === this.groupContacts[i].id) {
      return true;
    }
  }
  return false;
}

onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
    return;
  }
  this.groupContacts.splice(index, 1);
}
onDrop(event: CdkDragDrop<Contact[]>) {
    
    if (event.previousContainer === event.container) {
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    
    } else {
    
      const selectedContact: Contact = event.item.data;

     
      if (this.isInvalidContact(selectedContact)) {
        return;
      }
  
      this.groupContacts.splice(event.currentIndex, 0, selectedContact);
    } 
  }
}
