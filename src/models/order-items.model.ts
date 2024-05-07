import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Product} from './product.model';

@model()
export class OrderItems extends UserModifiableEntity {
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

  @property({
    type: 'number',
  })
  quantity?: number;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderItemsRelations {
  // describe navigational properties here
}

export type OrderItemsWithRelations = OrderItems & OrderItemsRelations;
