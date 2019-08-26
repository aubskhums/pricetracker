import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'buy-box',
        loadChildren: () => import('./buy-box/buy-box.module').then(m => m.PriceTrackerBuyBoxModule)
      },
      {
        path: 'track-price-product',
        loadChildren: () => import('./track-price-product/track-price-product.module').then(m => m.PriceTrackerTrackPriceProductModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PriceTrackerEntityModule {}
