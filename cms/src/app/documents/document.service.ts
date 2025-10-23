import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();


  documents:Document[] = [];
      constructor() {
          this.documents = MOCKDOCUMENTS;
       }
  
  getDocuments(): Document[] {
    return this.documents.slice();
  }
  
  getDocument(id: string): Document | null {
    for (let document of this.documents){
      if(document.id === id) {
        return document;
      }
    }
    return null;
  }
}
