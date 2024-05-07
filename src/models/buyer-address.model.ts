import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Buyer} from './buyer.model';

@model()
export class BuyerAddress extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

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
  })
  name?: string;

  @property({
    type: 'string',
    name: 'contact_number'
  })
  contactNumber?: string;

  @property({
    type: 'string',
  })
  building?: string;

  @property({
    type: 'string',
  })
  area?: string;

  @property({
    type: 'string',
    name: 'pin_code'
  })
  pinCode?: string;

  @property({
    type: 'string',
  })
  landmark?: string;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id'
  })
  userTenantId?: string;


  constructor(data?: Partial<BuyerAddress>) {
    super(data);
  }
}

export interface BuyerAddressRelations {
  // describe navigational properties here
}

export type BuyerAddressWithRelations = BuyerAddress & BuyerAddressRelations;
