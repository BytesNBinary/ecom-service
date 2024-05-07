import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {ProductReview} from './product-review.model';

@model()
export class Media extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @belongsTo(
    () => Product,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'product_id',
    required: false
  },
  )
  productId?: string;

  @belongsTo(
    () => ProductReview,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'review_id',
    required: false
  },
  )
  reviewId?: string;


  constructor(data?: Partial<Media>) {
    super(data);
  }
}

export interface MediaRelations {
  // describe navigational properties here
}

export type MediaWithRelations = Media & MediaRelations;
