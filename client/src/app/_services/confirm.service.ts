import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { observable, Observable, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef: BsModalRef;
  message: string;


  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation', 
    message = 'Are you sure to do this?', 
    btnOkText='Ok', 
    btnCancelText = 'Cancel'): Observable<boolean>{
      const config = {
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
      }
      this.bsModelRef = this.modalService.show(ConfirmDialogComponent, config);
      
      return new Observable<boolean>(this.getResult());
  }

  private getResult(){
    return (observer) => {
      const subscribe = this.bsModelRef.onHidden.subscribe(() => {
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe(){
          subscribe.unsubscribe();
        }
      }
    }
  }

}

