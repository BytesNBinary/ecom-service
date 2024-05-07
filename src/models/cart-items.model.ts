import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Cart} from './cart.model';
import {Product} from './product.model';

@model()
export class CartItems extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @belongsTo(
    () => Cart,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'cart_id',
    required: true
  },
  )
  cartId: string;

  @belongsTo(
    () => Product,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'product_id',
    required: true
  },
  )
  productId: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<CartItems>) {
    super(data);
  }
}

export interface CartItemsRelations {
  // describe navigational properties here
}

export type CartItemsWithRelations = CartItems & CartItemsRelations;
