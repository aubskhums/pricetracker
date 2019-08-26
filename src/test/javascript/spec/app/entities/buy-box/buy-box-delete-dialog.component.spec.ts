/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PriceTrackerTestModule } from '../../../test.module';
import { BuyBoxDeleteDialogComponent } from 'app/entities/buy-box/buy-box-delete-dialog.component';
import { BuyBoxService } from 'app/entities/buy-box/buy-box.service';

describe('Component Tests', () => {
  describe('BuyBox Management Delete Component', () => {
    let comp: BuyBoxDeleteDialogComponent;
    let fixture: ComponentFixture<BuyBoxDeleteDialogComponent>;
    let service: BuyBoxService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PriceTrackerTestModule],
        declarations: [BuyBoxDeleteDialogComponent]
      })
        .overrideTemplate(BuyBoxDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BuyBoxDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BuyBoxService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
