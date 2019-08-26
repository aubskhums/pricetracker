import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IBuyBox, BuyBox } from 'app/shared/model/buy-box.model';
import { BuyBoxService } from './buy-box.service';

@Component({
  selector: 'jhi-buy-box-update',
  templateUrl: './buy-box-update.component.html'
})
export class BuyBoxUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    isPreOrder: [],
    promitionQty: [],
    productId: [],
    addToCartText: [],
    productLineId: [],
    isAddToWishListAvailable: [],
    isDigital: []
  });

  constructor(protected buyBoxService: BuyBoxService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ buyBox }) => {
      this.updateForm(buyBox);
    });
  }

  updateForm(buyBox: IBuyBox) {
    this.editForm.patchValue({
      id: buyBox.id,
      isPreOrder: buyBox.isPreOrder,
      promitionQty: buyBox.promitionQty,
      productId: buyBox.productId,
      addToCartText: buyBox.addToCartText,
      productLineId: buyBox.productLineId != null ? buyBox.productLineId.format(DATE_TIME_FORMAT) : null,
      isAddToWishListAvailable: buyBox.isAddToWishListAvailable,
      isDigital: buyBox.isDigital
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const buyBox = this.createFromForm();
    if (buyBox.id !== undefined) {
      this.subscribeToSaveResponse(this.buyBoxService.update(buyBox));
    } else {
      this.subscribeToSaveResponse(this.buyBoxService.create(buyBox));
    }
  }

  private createFromForm(): IBuyBox {
    return {
      ...new BuyBox(),
      id: this.editForm.get(['id']).value,
      isPreOrder: this.editForm.get(['isPreOrder']).value,
      promitionQty: this.editForm.get(['promitionQty']).value,
      productId: this.editForm.get(['productId']).value,
      addToCartText: this.editForm.get(['addToCartText']).value,
      productLineId:
        this.editForm.get(['productLineId']).value != null
          ? moment(this.editForm.get(['productLineId']).value, DATE_TIME_FORMAT)
          : undefined,
      isAddToWishListAvailable: this.editForm.get(['isAddToWishListAvailable']).value,
      isDigital: this.editForm.get(['isDigital']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBuyBox>>) {
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
