import { juggler } from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {Getter, inject} from '@loopback/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import { Seller, SellerRelations } from '../models';
import {EcomDbSourceName} from '../types';
export class SellerRepository extends DefaultUserModifyCrudRepository<
  Seller,
  string,
  SellerRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getUser: Getter<IAuthUserWithPermissions | undefined>,
  ) {
    super(Seller, dataSource, getUser);
  }

}
