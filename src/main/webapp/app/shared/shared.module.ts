import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PriceTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PriceTrackerSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PriceTrackerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PriceTrackerSharedModule {
  static forRoot() {
    return {
      ngModule: PriceTrackerSharedModule
    };
  }
}
