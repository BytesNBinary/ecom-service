import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {Skus, SkusRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class SkusRepository extends DefaultUserModifyCrudRepository<
  Skus,
  string,
  SkusRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(Skus, dataSource, getUser);
  }
}
