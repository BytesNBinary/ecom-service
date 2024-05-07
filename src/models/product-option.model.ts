import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Product} from './product.model';
import {OptionType} from './option-type.model';
import {OptionValue} from './option-value.model';

@model()
export class ProductOption extends UserModifiableEntity {
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
    () => OptionType,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'option_type_id',
    required: true
  },
  )
  optionTypeId: string;

  @belongsTo(
    () => OptionValue,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'option_value_id',
    required: true
  },
  )
  optionValueId: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<ProductOption>) {
    super(data);
  }
}

export interface ProductOptionRelations {
  // describe navigational properties here
}

export type ProductOptionWithRelations = ProductOption & ProductOptionRelations;
