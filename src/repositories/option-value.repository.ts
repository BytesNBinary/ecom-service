import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {OptionValue, OptionValueRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class OptionValueRepository extends DefaultUserModifyCrudRepository<
  OptionValue,
  string,
  OptionValueRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getUser: Getter<IAuthUserWithPermissions | undefined>,
  ) {
    super(OptionValue, dataSource, getUser);
  }
}
