/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PriceTrackerTestModule } from '../../../test.module';
import { BuyBoxUpdateComponent } from 'app/entities/buy-box/buy-box-update.component';
import { BuyBoxService } from 'app/entities/buy-box/buy-box.service';
import { BuyBox } from 'app/shared/model/buy-box.model';

describe('Component Tests', () => {
  describe('BuyBox Management Update Component', () => {
    let comp: BuyBoxUpdateComponent;
    let fixture: ComponentFixture<BuyBoxUpdateComponent>;
    let service: BuyBoxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PriceTrackerTestModule],
        declarations: [BuyBoxUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BuyBoxUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BuyBoxUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BuyBoxService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BuyBox(123);
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
        const entity = new BuyBox();
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
