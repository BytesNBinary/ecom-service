import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Category} from './category.model';

@model()
export class Product extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  barcode?: string;

  @property({
    type: 'string',
  })
  mrp?: string;

  @property({
    type: 'string',
  })
  price?: string;

  @belongsTo(
    () => Category,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'category_id',
    required: true
  },
  )
  categoryId: string;

  @property({
    type: 'string',
    name: 'group_id'
  })
  groudId?: string;

  @property({
    type: 'boolean',
    default: false,
    name: 'is_wish_listed'
  })
  isWishListed?: boolean;

  @property({
    type: 'string',
    default: false,
    name: 'is_added_to_cart'
  })
  isAddedToCart?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
