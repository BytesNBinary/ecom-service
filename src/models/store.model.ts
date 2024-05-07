import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Seller} from './seller.model';

@model()
export class Store extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    name: 'store_name',
  })
  storeName?: string;

  @property({
    type: 'string',
    name: 'banner_image',
  })
  bannerImage?: string;

  @property({
    type: 'string',
    name: 'logo',
  })
  logo?: string;

  @property({
    type: 'string',
    name: 'description',
  })
  description?: string;

  @property({
    type: 'string',
    name: 'catalogue'
  })
  catalogue?: string;

  @belongsTo(
    () => Seller,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'seller_id',
    required: true
  },
  )
  sellerId: string;

  constructor(data?: Partial<Store>) {
    super(data);
  }
}

export interface StoreRelations {
  // describe navigational properties here
}

export type StoreWithRelations = Store & StoreRelations;
