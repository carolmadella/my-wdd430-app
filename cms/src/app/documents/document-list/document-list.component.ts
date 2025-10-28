import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  
  documents: Document[] = [];

  constructor(
    private readonly documentService: DocumentService,
      ){
        
      }
      ngOnInit(): void {
        this.documents=this.documentService.getDocuments();
        this.documentService.documentChangedEvent.subscribe((documents) => {
          this.documents = documents;
        })
      }
    
    
}
