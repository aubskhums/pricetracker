import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrackPriceProduct } from 'app/shared/model/track-price-product.model';
import { TrackPriceProductService } from './track-price-product.service';
import { TrackPriceProductComponent } from './track-price-product.component';
import { TrackPriceProductDetailComponent } from './track-price-product-detail.component';
import { TrackPriceProductUpdateComponent } from './track-price-product-update.component';
import { TrackPriceProductDeletePopupComponent } from './track-price-product-delete-dialog.component';
import { ITrackPriceProduct } from 'app/shared/model/track-price-product.model';

@Injectable({ providedIn: 'root' })
export class TrackPriceProductResolve implements Resolve<ITrackPriceProduct> {
  constructor(private service: TrackPriceProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrackPriceProduct> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TrackPriceProduct>) => response.ok),
        map((trackPriceProduct: HttpResponse<TrackPriceProduct>) => trackPriceProduct.body)
      );
    }
    return of(new TrackPriceProduct());
  }
}

export const trackPriceProductRoute: Routes = [
  {
    path: '',
    component: TrackPriceProductComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrackPriceProducts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TrackPriceProductDetailComponent,
    resolve: {
      trackPriceProduct: TrackPriceProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrackPriceProducts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TrackPriceProductUpdateComponent,
    resolve: {
      trackPriceProduct: TrackPriceProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrackPriceProducts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TrackPriceProductUpdateComponent,
    resolve: {
      trackPriceProduct: TrackPriceProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrackPriceProducts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const trackPriceProductPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TrackPriceProductDeletePopupComponent,
    resolve: {
      trackPriceProduct: TrackPriceProductResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TrackPriceProducts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
