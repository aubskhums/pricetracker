import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBuyBox } from 'app/shared/model/buy-box.model';

type EntityResponseType = HttpResponse<IBuyBox>;
type EntityArrayResponseType = HttpResponse<IBuyBox[]>;

@Injectable({ providedIn: 'root' })
export class BuyBoxService {
  public resourceUrl = SERVER_API_URL + 'api/buy-boxes';

  constructor(protected http: HttpClient) {}

  create(buyBox: IBuyBox): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(buyBox);
    return this.http
      .post<IBuyBox>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(buyBox: IBuyBox): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(buyBox);
    return this.http
      .put<IBuyBox>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBuyBox>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBuyBox[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(buyBox: IBuyBox): IBuyBox {
    const copy: IBuyBox = Object.assign({}, buyBox, {
      productLineId: buyBox.productLineId != null && buyBox.productLineId.isValid() ? buyBox.productLineId.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.productLineId = res.body.productLineId != null ? moment(res.body.productLineId) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((buyBox: IBuyBox) => {
        buyBox.productLineId = buyBox.productLineId != null ? moment(buyBox.productLineId) : null;
      });
    }
    return res;
  }
}
