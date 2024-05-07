import {model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';

@model({name: 'buyers'})
export class Buyer extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    name: 'display_id',
  })
  displayId?: string;

  @property({
    type: 'string',
    name: 'profile_image',
  })
  profileImage?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId: string;

  constructor(data?: Partial<Buyer>) {
    super(data);
  }
}

export interface BuyerRelations {
  // describe navigational properties here
}

export type BuyerWithRelations = Buyer & BuyerRelations;
