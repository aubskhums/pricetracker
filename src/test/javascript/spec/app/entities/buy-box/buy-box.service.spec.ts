/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BuyBoxService } from 'app/entities/buy-box/buy-box.service';
import { IBuyBox, BuyBox } from 'app/shared/model/buy-box.model';

describe('Service Tests', () => {
  describe('BuyBox Service', () => {
    let injector: TestBed;
    let service: BuyBoxService;
    let httpMock: HttpTestingController;
    let elemDefault: IBuyBox;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(BuyBoxService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BuyBox(0, false, 0, 0, 'AAAAAAA', currentDate, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            productLineId: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a BuyBox', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            productLineId: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            productLineId: currentDate
          },
          returnedFromService
        );
        service
          .create(new BuyBox(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a BuyBox', async () => {
        const returnedFromService = Object.assign(
          {
            isPreOrder: true,
            promitionQty: 1,
            productId: 1,
            addToCartText: 'BBBBBB',
            productLineId: currentDate.format(DATE_TIME_FORMAT),
            isAddToWishListAvailable: true,
            isDigital: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            productLineId: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of BuyBox', async () => {
        const returnedFromService = Object.assign(
          {
            isPreOrder: true,
            promitionQty: 1,
            productId: 1,
            addToCartText: 'BBBBBB',
            productLineId: currentDate.format(DATE_TIME_FORMAT),
            isAddToWishListAvailable: true,
            isDigital: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            productLineId: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a BuyBox', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
