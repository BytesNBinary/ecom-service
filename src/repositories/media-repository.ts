import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {Media, MediaRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class MediaRepository extends DefaultUserModifyCrudRepository<
  Media,
  string,
  MediaRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER, {optional: true})
    protected readonly getUser: Getter<IAuthUserWithPermissions | undefined>,
  ) {
    super(Media, dataSource, getUser);
  }
}
