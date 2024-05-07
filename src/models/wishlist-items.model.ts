import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Product} from './product.model';
import {Wishlist} from './wishlist.model';

@model()
export class WishlistItems extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @belongsTo(
    () => Product,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'product_id',
    required: true
  },
  )
  productId: string;

  @belongsTo(
    () => Wishlist,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'wishlist_id',
    required: true
  },
  )
  wishlistId: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<WishlistItems>) {
    super(data);
  }
}

export interface WishlistItemsRelations {
  // describe navigational properties here
}

export type WishlistItemsWithRelations = WishlistItems & WishlistItemsRelations;
