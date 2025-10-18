import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../../models/document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      '1',
      'Test',
      'This is a Test',
      'google.com',
    ),
    new Document(
      '2',
      'Test2',
      'This is a Second Test',
      'google.com',
    ),
    new Document(
      '3',
      'Test3',
      'This is a Third Test',
      'google.com',
    ),
    new Document (
      '4',
      'CIT 260 - Full Web Stack Development',
      'Open the terminal window and enter the ng serve command to start your application. View your application in the browser.',
      'https://byui.instructure.com/courses/367098/pages/w04-assignment-instructions',
    )
  ];

  onSelectedDocument(document: Document){
  this.selectedDocumentEvent.emit(document);
  }
}
