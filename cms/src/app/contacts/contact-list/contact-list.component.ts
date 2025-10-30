import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  subscription?: Subscription;

  constructor(
    private readonly contactService: ContactService,
  ){}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.contacts=this.contactService.getContacts();
    
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts) => {
          this.contacts = contacts;
        }) 
  }

}
