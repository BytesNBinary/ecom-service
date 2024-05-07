import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {BuyerAddress, BuyerAddressRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class BuyerAddressRepository extends DefaultUserModifyCrudRepository<
  BuyerAddress,
  string,
  BuyerAddressRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(BuyerAddress, dataSource, getUser);
  }
}
