import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrackPriceProduct } from 'app/shared/model/track-price-product.model';

@Component({
  selector: 'jhi-track-price-product-detail',
  templateUrl: './track-price-product-detail.component.html'
})
export class TrackPriceProductDetailComponent implements OnInit {
  trackPriceProduct: ITrackPriceProduct;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trackPriceProduct }) => {
      this.trackPriceProduct = trackPriceProduct;
    });
  }

  previousState() {
    window.history.back();
  }
}
