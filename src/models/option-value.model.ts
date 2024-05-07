import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {OptionType} from './option-type.model';

@model()
export class OptionValue extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  value?: string;

  @belongsTo(
    () => OptionType,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'option_type_id',
    required: true
  },
  )
  optionTypeId: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<OptionValue>) {
    super(data);
  }
}

export interface OptionValueRelations {
  // describe navigational properties here
}

export type OptionValueWithRelations = OptionValue & OptionValueRelations;
