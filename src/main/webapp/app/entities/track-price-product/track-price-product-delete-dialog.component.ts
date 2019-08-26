import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrackPriceProduct } from 'app/shared/model/track-price-product.model';
import { TrackPriceProductService } from './track-price-product.service';

@Component({
  selector: 'jhi-track-price-product-delete-dialog',
  templateUrl: './track-price-product-delete-dialog.component.html'
})
export class TrackPriceProductDeleteDialogComponent {
  trackPriceProduct: ITrackPriceProduct;

  constructor(
    protected trackPriceProductService: TrackPriceProductService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.trackPriceProductService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'trackPriceProductListModification',
        content: 'Deleted an trackPriceProduct'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-track-price-product-delete-popup',
  template: ''
})
export class TrackPriceProductDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trackPriceProduct }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TrackPriceProductDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.trackPriceProduct = trackPriceProduct;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/track-price-product', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/track-price-product', { outlets: { popup: null } }]);
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
