import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContactService } from '../contact.service';



@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {

  contact: Contact | null = null;

  constructor(
    private readonly contactService: ContactService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    
  ){}

   ngOnInit(): void {

      this.activatedRoute.paramMap.subscribe((params:ParamMap): void => {
        const contactId = params.get('id');
        if (!contactId){
          return;
        }
        this.contact = this.contactService.getContact(contactId);
      });
    }
    onDelete(): void{
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['contacts']);
    }
}

