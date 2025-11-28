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

  
      constructor(
        private readonly httpClient: HttpClient
        
      ) {
          
          this.httpClient.get<{documents: Document[]}>('http://localhost:3000/documents')
          .subscribe ({
            next:(result)=>{
              console.log(result.documents)
            this.documents = result.documents;
            this.sortAndSend();
          },
          error:(error:any)=>{
            console.error(error);
          }
      });

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

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }
    this.httpClient.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        () => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  private sortAndSend(): void {
    this.documents.sort((a, b) => parseInt(a.id, 10) -parseInt(b.id, 10));
    this.documentListChangedEvent.next(this.documents.slice())
  }
}
