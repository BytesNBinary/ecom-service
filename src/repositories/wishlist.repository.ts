import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {Wishlist, WishlistRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class WishlistRepository extends DefaultUserModifyCrudRepository<
  Wishlist,
  string,
  WishlistRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(Wishlist, dataSource, getUser);
  }
}
