/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PriceTrackerTestModule } from '../../../test.module';
import { BuyBoxDetailComponent } from 'app/entities/buy-box/buy-box-detail.component';
import { BuyBox } from 'app/shared/model/buy-box.model';

describe('Component Tests', () => {
  describe('BuyBox Management Detail Component', () => {
    let comp: BuyBoxDetailComponent;
    let fixture: ComponentFixture<BuyBoxDetailComponent>;
    const route = ({ data: of({ buyBox: new BuyBox(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PriceTrackerTestModule],
        declarations: [BuyBoxDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BuyBoxDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BuyBoxDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.buyBox).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
