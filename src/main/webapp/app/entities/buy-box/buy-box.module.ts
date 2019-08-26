import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PriceTrackerSharedModule } from 'app/shared';
import {
  BuyBoxComponent,
  BuyBoxDetailComponent,
  BuyBoxUpdateComponent,
  BuyBoxDeletePopupComponent,
  BuyBoxDeleteDialogComponent,
  buyBoxRoute,
  buyBoxPopupRoute
} from './';

const ENTITY_STATES = [...buyBoxRoute, ...buyBoxPopupRoute];

@NgModule({
  imports: [PriceTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BuyBoxComponent, BuyBoxDetailComponent, BuyBoxUpdateComponent, BuyBoxDeleteDialogComponent, BuyBoxDeletePopupComponent],
  entryComponents: [BuyBoxComponent, BuyBoxUpdateComponent, BuyBoxDeleteDialogComponent, BuyBoxDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PriceTrackerBuyBoxModule {}
