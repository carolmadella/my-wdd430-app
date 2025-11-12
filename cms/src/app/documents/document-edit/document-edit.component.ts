import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null= null; 
  document: Document | null= null;
  editMode: boolean = false;

  constructor(
            private documentService: DocumentService,
            private router: Router,
            private route: ActivatedRoute) {

}

ngOnInit(): void {

  this.route.paramMap.subscribe((params:ParamMap): void => {
        const documentId = params.get('id');
        if (!documentId){
          this.editMode= false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(documentId);
        if (!this.originalDocument){
          return;
        }
        this.editMode= true;
        this.document= JSON.parse(JSON.stringify(this.originalDocument));
      });
}

onSubmit(form: NgForm):void{
  const value=  form.value;
  const newDocument= new Document(
    this.document?.id || '',
    value.name,
    value.description,
    value.url
  );
 if(this.editMode){
  this.documentService.updateDocument(this.originalDocument!, newDocument);
 }
 else {
  this.documentService.addDocument(newDocument);
 }
 this.router.navigate(['/documents']);
}



onCancel():void{
  this.router.navigate(['/documents']);
}
}
