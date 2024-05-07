import { model, property } from '@loopback/repository';
import {UserModifiableEntity} from '@sourceloop/core';

@model()
export class Seller extends UserModifiableEntity {
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
    name: 'facebook_id',
  })
  facebookId?: string;

  @property({
    type: 'string',
    name: 'instagram_id',
  })
  instagramId?: string;

  @property({
    type: 'string',
    name: 'profile_image',
  })
  profileImage?: string;

  @property({
    type: 'string',
    name: 'company_name',
  })
  companyName?: string;

  @property({
    type: 'string',
    name: 'website',
  })
  website?: string;

  @property({
    type: 'string',
    name: 'pan_number',
  })
  panNumber?: string;

  @property({
    type: 'string',
    name: 'gst_name',
  })
  gstName?: string;

  @property({
    type: 'string',
    name: 'gst_number',
  })
  gstNumber?: string;

  @property({
    type: 'string',
    name: 'type_of_firm',
  })
  typeOfFirm?: string;

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
  city?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
    name: 'user_tenant_id',
  })
  userTenantId?: string;

  constructor(data?: Partial<Seller>) {
    super(data);
  }
}

export interface SellerRelations {
  // describe navigational properties here
}

export type SellerWithRelations = Seller & SellerRelations;
