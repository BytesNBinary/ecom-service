import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {OrderDetails, OrderDetailsRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class OrderDetailsRepository extends DefaultUserModifyCrudRepository<
  OrderDetails,
  string,
  OrderDetailsRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(OrderDetails, dataSource, getUser);
  }
}
