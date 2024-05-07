import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {ProductOption, ProductOptionRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class ProductOptionRepository extends DefaultUserModifyCrudRepository<
  ProductOption,
  string,
  ProductOptionRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(ProductOption, dataSource, getUser);
  }
}
