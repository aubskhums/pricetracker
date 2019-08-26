import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BuyBox } from 'app/shared/model/buy-box.model';
import { BuyBoxService } from './buy-box.service';
import { BuyBoxComponent } from './buy-box.component';
import { BuyBoxDetailComponent } from './buy-box-detail.component';
import { BuyBoxUpdateComponent } from './buy-box-update.component';
import { BuyBoxDeletePopupComponent } from './buy-box-delete-dialog.component';
import { IBuyBox } from 'app/shared/model/buy-box.model';

@Injectable({ providedIn: 'root' })
export class BuyBoxResolve implements Resolve<IBuyBox> {
  constructor(private service: BuyBoxService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBuyBox> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BuyBox>) => response.ok),
        map((buyBox: HttpResponse<BuyBox>) => buyBox.body)
      );
    }
    return of(new BuyBox());
  }
}

export const buyBoxRoute: Routes = [
  {
    path: '',
    component: BuyBoxComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BuyBoxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BuyBoxDetailComponent,
    resolve: {
      buyBox: BuyBoxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BuyBoxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BuyBoxUpdateComponent,
    resolve: {
      buyBox: BuyBoxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BuyBoxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BuyBoxUpdateComponent,
    resolve: {
      buyBox: BuyBoxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BuyBoxes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const buyBoxPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BuyBoxDeletePopupComponent,
    resolve: {
      buyBox: BuyBoxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BuyBoxes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
