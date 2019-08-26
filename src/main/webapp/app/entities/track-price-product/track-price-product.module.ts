import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PriceTrackerSharedModule } from 'app/shared';
import {
  TrackPriceProductComponent,
  TrackPriceProductDetailComponent,
  TrackPriceProductUpdateComponent,
  TrackPriceProductDeletePopupComponent,
  TrackPriceProductDeleteDialogComponent,
  trackPriceProductRoute,
  trackPriceProductPopupRoute
} from './';

const ENTITY_STATES = [...trackPriceProductRoute, ...trackPriceProductPopupRoute];

@NgModule({
  imports: [PriceTrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrackPriceProductComponent,
    TrackPriceProductDetailComponent,
    TrackPriceProductUpdateComponent,
    TrackPriceProductDeleteDialogComponent,
    TrackPriceProductDeletePopupComponent
  ],
  entryComponents: [
    TrackPriceProductComponent,
    TrackPriceProductUpdateComponent,
    TrackPriceProductDeleteDialogComponent,
    TrackPriceProductDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PriceTrackerTrackPriceProductModule {}
