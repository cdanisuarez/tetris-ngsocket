import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { IEvent } from 'src/app/interfaces/event.interface';
// import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: IEvent;
  private _docSub: Subscription;

  constructor(private documentService: ApiService) { }

  ngOnInit(): void {
    // this._docSub = this.documentService.currentEvent.pipe(
    //   startWith({ id: '', doc: 'Select an existing document or create a new one to get started' })
    // ).subscribe(document => this.document = document);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}
