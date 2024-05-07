import {Entity, belongsTo, model, property} from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';
import {Buyer} from './buyer.model';
import {Payment} from './payment.model';

@model()
export class OrderDetails extends UserModifiableEntity {
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

  @belongsTo(
    () => Payment,
  { keyFrom: 'id', name: 'id' },
  {
    name: 'payment_id',
    required: true
  },
  )
  paymentId: string;

  @property({
    type: 'date',
    name: 'ordered_on'
  })
  orderedOn?: string;

  @property({
    type: 'date',
    name: 'expected_on'
  })
  expectedOn?: string;

  @property({
    type: 'string',
    name: 'tracking_id'
  })
  trackingId?: string;

  @property({
    type: 'string',
    name: 'total_amount'
  })
  totalAmount?: string;

  @property({
    type: 'boolean',
    name: 'is_shipped'
  })
  isShipped?: boolean;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;


  constructor(data?: Partial<OrderDetails>) {
    super(data);
  }
}

export interface OrderDetailsRelations {
  // describe navigational properties here
}

export type OrderDetailsWithRelations = OrderDetails & OrderDetailsRelations;
