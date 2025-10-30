import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  
  documents: Document[] = [];
  subscription?: Subscription;

  constructor(
    private readonly documentService: DocumentService,
      ){
        
      }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
      ngOnInit(): void {
        this.documents=this.documentService.getDocuments();
        

        this.subscription = this.documentService.documentListChangedEvent.subscribe((documents) => {
          this.documents = documents;
        }) 
      }
    
    
}
