import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  
  documents: Document[] = [];

  constructor(
    private readonly documentService: DocumentService,
      ){
        
      }
      ngOnInit(): void {
        this.documents=this.documentService.getDocuments();
      }
    
    onSelectedDocument(document: Document) {
      this.documentService.documentSelectedEvent.emit(document);
    }
}
