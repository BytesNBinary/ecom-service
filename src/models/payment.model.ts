import {Entity, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';

@model()
export class Payment extends UserModifiableEntity {
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
    name: 'transaction_id'
  })
  transactionId?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
