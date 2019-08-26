import { Moment } from 'moment';

export interface IBuyBox {
  id?: number;
  isPreOrder?: boolean;
  promitionQty?: number;
  productId?: number;
  addToCartText?: string;
  productLineId?: Moment;
  isAddToWishListAvailable?: boolean;
  isDigital?: boolean;
}

export class BuyBox implements IBuyBox {
  constructor(
    public id?: number,
    public isPreOrder?: boolean,
    public promitionQty?: number,
    public productId?: number,
    public addToCartText?: string,
    public productLineId?: Moment,
    public isAddToWishListAvailable?: boolean,
    public isDigital?: boolean
  ) {
    this.isPreOrder = this.isPreOrder || false;
    this.isAddToWishListAvailable = this.isAddToWishListAvailable || false;
    this.isDigital = this.isDigital || false;
  }
}
