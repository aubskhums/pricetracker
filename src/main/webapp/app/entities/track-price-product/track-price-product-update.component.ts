import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITrackPriceProduct, TrackPriceProduct } from 'app/shared/model/track-price-product.model';
import { TrackPriceProductService } from './track-price-product.service';

@Component({
  selector: 'jhi-track-price-product-update',
  templateUrl: './track-price-product-update.component.html'
})
export class TrackPriceProductUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    currentPrice: [],
    dateTimePriceModified: [],
    pILD: [null, [Validators.required]]
  });

  constructor(
    protected trackPriceProductService: TrackPriceProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ trackPriceProduct }) => {
      this.updateForm(trackPriceProduct);
    });
  }

  updateForm(trackPriceProduct: ITrackPriceProduct) {
    this.editForm.patchValue({
      id: trackPriceProduct.id,
      currentPrice: trackPriceProduct.currentPrice,
      dateTimePriceModified:
        trackPriceProduct.dateTimePriceModified != null ? trackPriceProduct.dateTimePriceModified.format(DATE_TIME_FORMAT) : null,
      pILD: trackPriceProduct.pILD
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const trackPriceProduct = this.createFromForm();
    if (trackPriceProduct.id !== undefined) {
      this.subscribeToSaveResponse(this.trackPriceProductService.update(trackPriceProduct));
    } else {
      this.subscribeToSaveResponse(this.trackPriceProductService.create(trackPriceProduct));
    }
  }

  private createFromForm(): ITrackPriceProduct {
    return {
      ...new TrackPriceProduct(),
      id: this.editForm.get(['id']).value,
      currentPrice: this.editForm.get(['currentPrice']).value,
      dateTimePriceModified:
        this.editForm.get(['dateTimePriceModified']).value != null
          ? moment(this.editForm.get(['dateTimePriceModified']).value, DATE_TIME_FORMAT)
          : undefined,
      pILD: this.editForm.get(['pILD']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrackPriceProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
