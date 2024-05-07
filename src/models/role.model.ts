import {Entity, model} from '@loopback/repository';
import {Permissions} from 'loopback4-authorization';

@model()
export class Role extends Entity implements Permissions<string> {
  constructor(data?: Partial<Role>) {
    super(data);
  }
  permissions: string[];
}
