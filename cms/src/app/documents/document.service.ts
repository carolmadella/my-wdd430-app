import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from '../models/document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentListChangedEvent: Subject<Document[]> = new Subject();



  documents:Document[] = [];

  maxDocumentId: number;
      constructor() {
          this.documents = MOCKDOCUMENTS;
          this.maxDocumentId = this.getMaxId();
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

  deleteDocument(document: Document | null) {
   if (!document) {
      return;
   }
   const pos = this.documents.indexOf(document);
   if (pos < 0) {
      return;
   }
   this.documents.splice(pos, 1);
   this.documentListChangedEvent.next(this.documents.slice());
}

  getMaxId(): number{
    let maxId = 0;
    for (let document of this.documents){
      let currentId = parseInt(document.id, 10);
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document){
    if(newDocument === undefined || newDocument === null){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument:Document, newDocument:Document){
    if(newDocument === undefined || newDocument === null ||originalDocument === undefined || originalDocument === null){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
   if (pos < 0) {
      return;
   }
newDocument.id = originalDocument.id;
this.documents[pos] = newDocument;
this.documentListChangedEvent.next(this.documents.slice());
  }
}
