import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {SubCategory, SubCategoryRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class SubCategoryRepository extends DefaultUserModifyCrudRepository<
  SubCategory,
  string,
  SubCategoryRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(SubCategory, dataSource, getUser);
  }
}
