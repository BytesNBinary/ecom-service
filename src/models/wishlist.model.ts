import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Buyer} from './buyer.model';

@model()
export class Wishlist extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @belongsTo(
    () => Buyer,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'buyer_id',
    required: true
  },
  )
  buyerId: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<Wishlist>) {
    super(data);
  }
}

export interface WishlistRelations {
  // describe navigational properties here
}

export type WishlistWithRelations = Wishlist & WishlistRelations;
