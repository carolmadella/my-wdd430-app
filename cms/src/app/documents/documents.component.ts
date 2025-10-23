import { Component, OnInit } from '@angular/core';
import { Document } from '../models/document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {
  
  selectedDocument: Document | undefined; 
  
  constructor(
      private readonly documentService: DocumentService,

    ){}
  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document:Document) => this.selectedDocument = document
    );
  }
}
