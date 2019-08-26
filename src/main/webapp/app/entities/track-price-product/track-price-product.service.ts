import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrackPriceProduct } from 'app/shared/model/track-price-product.model';

type EntityResponseType = HttpResponse<ITrackPriceProduct>;
type EntityArrayResponseType = HttpResponse<ITrackPriceProduct[]>;

@Injectable({ providedIn: 'root' })
export class TrackPriceProductService {
  public resourceUrl = SERVER_API_URL + 'api/track-price-products';

  constructor(protected http: HttpClient) {}

  create(trackPriceProduct: ITrackPriceProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trackPriceProduct);
    return this.http
      .post<ITrackPriceProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trackPriceProduct: ITrackPriceProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trackPriceProduct);
    return this.http
      .put<ITrackPriceProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrackPriceProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrackPriceProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trackPriceProduct: ITrackPriceProduct): ITrackPriceProduct {
    const copy: ITrackPriceProduct = Object.assign({}, trackPriceProduct, {
      dateTimePriceModified:
        trackPriceProduct.dateTimePriceModified != null && trackPriceProduct.dateTimePriceModified.isValid()
          ? trackPriceProduct.dateTimePriceModified.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateTimePriceModified = res.body.dateTimePriceModified != null ? moment(res.body.dateTimePriceModified) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((trackPriceProduct: ITrackPriceProduct) => {
        trackPriceProduct.dateTimePriceModified =
          trackPriceProduct.dateTimePriceModified != null ? moment(trackPriceProduct.dateTimePriceModified) : null;
      });
    }
    return res;
  }
}
