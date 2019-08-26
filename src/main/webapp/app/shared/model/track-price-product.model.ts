import { Moment } from 'moment';

export interface ITrackPriceProduct {
  id?: number;
  currentPrice?: number;
  dateTimePriceModified?: Moment;
  pILD?: string;
}

export class TrackPriceProduct implements ITrackPriceProduct {
  constructor(public id?: number, public currentPrice?: number, public dateTimePriceModified?: Moment, public pILD?: string) {}
}
