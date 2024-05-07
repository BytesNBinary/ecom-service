import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {DefaultUserModifyCrudRepository} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {IAuthUserWithPermissions} from 'loopback4-authorization';
import {Buyer, BuyerRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class BuyerRepository extends DefaultUserModifyCrudRepository<
  Buyer,
  string,
  BuyerRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getUser: Getter<
      IAuthUserWithPermissions | undefined
    >,
  ) {
    super(Buyer, dataSource, getUser);
  }
}
