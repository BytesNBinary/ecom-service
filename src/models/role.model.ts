import {Model, model, property} from '@loopback/repository';

@model()
export class Role extends Model {

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
