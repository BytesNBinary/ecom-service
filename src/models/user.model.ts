import {Entity, model, property} from '@loopback/repository';
import {UserPermission, UserPermissionsOverride} from 'loopback4-authorization';
import {Role} from './role.model';

@model({
  name: 'users',
})
export class User extends Entity implements UserPermissionsOverride<string> {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'first_name',
  })
  firstName: string;

  @property({
    type: 'string',
    name: 'last_name',
  })
  lastName: string;

  @property({
    type: 'string',
    name: 'middle_name',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  permissions: UserPermission<string>[];

  @property({
    type: 'string',
  })
  role: Role;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
