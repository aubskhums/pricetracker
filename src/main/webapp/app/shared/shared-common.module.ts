import { NgModule } from '@angular/core';

import { PriceTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [PriceTrackerSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [PriceTrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PriceTrackerSharedCommonModule {}
