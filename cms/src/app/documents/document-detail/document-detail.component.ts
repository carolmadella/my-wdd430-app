import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WindRefService } from '../../shared/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
 document: Document | null = null;
 nativeWindow: any;

 constructor(
  private readonly documentService:DocumentService,
  private readonly router: Router,
  private readonly activatedRoute: ActivatedRoute,
  private readonly windRefService: WindRefService
 ){}

 
  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();
    
    this.activatedRoute.paramMap.subscribe((params:ParamMap): void => {
      const documentId = params.get('id');
      if (!documentId){
        return;
      }
      this.document = this.documentService.getDocument(documentId);
    });
  }

  onView(){
    if (this.document && this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
   this.documentService.deleteDocument(this.document);
   this.router.navigate(['/documents']);
}

}
