import {Entity, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';

@model()
export class OptionType extends UserModifiableEntity {
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
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<OptionType>) {
    super(data);
  }
}

export interface OptionTypeRelations {
  // describe navigational properties here
}

export type OptionTypeWithRelations = OptionType & OptionTypeRelations;
