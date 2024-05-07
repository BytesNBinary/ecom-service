import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Product} from './product.model';

@model()
export class Skus extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  sku?: string;

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
  })
  description?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<Skus>) {
    super(data);
  }
}

export interface SkusRelations {
  // describe navigational properties here
}

export type SkusWithRelations = Skus & SkusRelations;
