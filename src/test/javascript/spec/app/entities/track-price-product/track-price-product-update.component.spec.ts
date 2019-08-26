/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PriceTrackerTestModule } from '../../../test.module';
import { TrackPriceProductUpdateComponent } from 'app/entities/track-price-product/track-price-product-update.component';
import { TrackPriceProductService } from 'app/entities/track-price-product/track-price-product.service';
import { TrackPriceProduct } from 'app/shared/model/track-price-product.model';

describe('Component Tests', () => {
  describe('TrackPriceProduct Management Update Component', () => {
    let comp: TrackPriceProductUpdateComponent;
    let fixture: ComponentFixture<TrackPriceProductUpdateComponent>;
    let service: TrackPriceProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PriceTrackerTestModule],
        declarations: [TrackPriceProductUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TrackPriceProductUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackPriceProductUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackPriceProductService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackPriceProduct(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackPriceProduct();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
