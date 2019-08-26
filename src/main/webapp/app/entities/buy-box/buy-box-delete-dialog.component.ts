import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBuyBox } from 'app/shared/model/buy-box.model';
import { BuyBoxService } from './buy-box.service';

@Component({
  selector: 'jhi-buy-box-delete-dialog',
  templateUrl: './buy-box-delete-dialog.component.html'
})
export class BuyBoxDeleteDialogComponent {
  buyBox: IBuyBox;

  constructor(protected buyBoxService: BuyBoxService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.buyBoxService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'buyBoxListModification',
        content: 'Deleted an buyBox'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-buy-box-delete-popup',
  template: ''
})
export class BuyBoxDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ buyBox }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BuyBoxDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.buyBox = buyBox;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/buy-box', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/buy-box', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
