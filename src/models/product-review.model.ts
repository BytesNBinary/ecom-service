import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Product} from './product.model';
import {Buyer} from './buyer.model';

@model()
export class ProductReview extends UserModifiableEntity {
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
    name: 'no_of_stars'
  })
  noOfStars?: number;

  @property({
    type: 'string',
  })
  description?: string;

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

  constructor(data?: Partial<ProductReview>) {
    super(data);
  }
}

export interface ProductReviewRelations {
  // describe navigational properties here
}

export type ProductReviewWithRelations = ProductReview & ProductReviewRelations;
