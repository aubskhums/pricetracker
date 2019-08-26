/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PriceTrackerTestModule } from '../../../test.module';
import { TrackPriceProductDetailComponent } from 'app/entities/track-price-product/track-price-product-detail.component';
import { TrackPriceProduct } from 'app/shared/model/track-price-product.model';

describe('Component Tests', () => {
  describe('TrackPriceProduct Management Detail Component', () => {
    let comp: TrackPriceProductDetailComponent;
    let fixture: ComponentFixture<TrackPriceProductDetailComponent>;
    const route = ({ data: of({ trackPriceProduct: new TrackPriceProduct(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PriceTrackerTestModule],
        declarations: [TrackPriceProductDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TrackPriceProductDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackPriceProductDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trackPriceProduct).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
