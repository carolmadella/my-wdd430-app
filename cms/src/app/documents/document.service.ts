import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../models/document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelectedEvent: EventEmitter<Document> = new EventEmitter();
  documentListChangedEvent: Subject<Document[]> = new Subject();



  documents:Document[] = [];

  maxDocumentId: number = 0;
      constructor(
        private readonly httpClient: HttpClient
      ) {
          
          this.httpClient.get<Document[]>('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/documents.json')
          .subscribe ({
            next:(documents)=>{
            this.documents = documents;
            
            this.maxDocumentId = this.getMaxId();
            this.documents.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
            this.documentListChangedEvent.next(this.documents.slice())
          },
          error:(error:any)=>{
            console.error(error);
          }
      });

       } 

  storeDocuments(){
    const documentsJson: string = JSON.stringify(this.documents);
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.httpClient.put('https://cms-wdd430-carolina-default-rtdb.firebaseio.com/documents.json',documentsJson, { headers: httpHeaders })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
        }
      );
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
   this.storeDocuments();
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
    this.storeDocuments();
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
this.storeDocuments();
  }
}
