import {Getter, inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {
  DefaultUserModifyCrudRepository,
  IAuthUserWithPermissions,
} from '@sourceloop/core';
import {AuthenticationBindings} from 'loopback4-authentication';
import {CartItems, CartItemsRelations} from '../models';
import {EcomDbSourceName} from '../types';

export class CartItemsRepository extends DefaultUserModifyCrudRepository<
  CartItems,
  string,
  CartItemsRelations
> {
  constructor(
    @inject(`datasources.${EcomDbSourceName}`)
    dataSource: juggler.DataSource,
    @inject(AuthenticationBindings.CURRENT_USER)
    private readonly getUser: Getter<IAuthUserWithPermissions>,
  ) {
    super(CartItems, dataSource, getUser);
  }
}
