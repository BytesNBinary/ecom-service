import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Category} from './category.model';

@model()
export class SubCategory extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  description?: string;

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
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<SubCategory>) {
    super(data);
  }
}

export interface SubCategoryRelations {
  // describe navigational properties here
}

export type SubCategoryWithRelations = SubCategory & SubCategoryRelations;
