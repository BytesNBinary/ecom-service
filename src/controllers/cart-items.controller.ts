import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CartItems} from '../models';
import { CartItemsRepository } from '../repositories';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class CartItemsController {
  constructor(
    @repository(CartItemsRepository)
    public cartItemsRepository : CartItemsRepository,
  ) {}
  @authorize({
    permissions: [PermissionKeys.CreateCart],
  })
  @authenticate(STRATEGY.BEARER)
  @post('/cart-items')
  @response(200, {
    description: 'CartItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(CartItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItems, {
            title: 'NewCartItems',
            exclude: ['id'],
          }),
        },
      },
    })
    cartItems: Omit<CartItems, 'id'>,
  ): Promise<CartItems> {
    return this.cartItemsRepository.create(cartItems);
  }
  @authorize({
    permissions: [PermissionKeys.ViewCart],
  })
  @authenticate(STRATEGY.BEARER)
  @get('/cart-items/count')
  @response(200, {
    description: 'CartItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CartItems) where?: Where<CartItems>,
  ): Promise<Count> {
    return this.cartItemsRepository.count(where);
  }
  @authorize({
    permissions: [PermissionKeys.ViewCart],
  })
  @authenticate(STRATEGY.BEARER)
  @get('/cart-items')
  @response(200, {
    description: 'Array of CartItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CartItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CartItems) filter?: Filter<CartItems>,
  ): Promise<CartItems[]> {
    return this.cartItemsRepository.find(filter);
  }
  @authorize({
    permissions: [PermissionKeys.UpdateCart],
  })
  @authenticate(STRATEGY.BEARER)
  @patch('/cart-items')
  @response(200, {
    description: 'CartItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItems, {partial: true}),
        },
      },
    })
    cartItems: CartItems,
    @param.where(CartItems) where?: Where<CartItems>,
  ): Promise<Count> {
    return this.cartItemsRepository.updateAll(cartItems, where);
  }
  @authorize({
    permissions: [PermissionKeys.ViewCart],
  })
  @authenticate(STRATEGY.BEARER)
  @get('/cart-items/{id}')
  @response(200, {
    description: 'CartItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CartItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CartItems, {exclude: 'where'}) filter?: FilterExcludingWhere<CartItems>
  ): Promise<CartItems> {
    return this.cartItemsRepository.findById(id, filter);
  }
  @authorize({
    permissions: [PermissionKeys.UpdateCart],
  })
  @authenticate(STRATEGY.BEARER)
  @patch('/cart-items/{id}')
  @response(204, {
    description: 'CartItems PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItems, {partial: true}),
        },
      },
    })
    cartItems: CartItems,
  ): Promise<void> {
    await this.cartItemsRepository.updateById(id, cartItems);
  }
  @authorize({
    permissions: [PermissionKeys.UpdateCart],
  })
  @authenticate(STRATEGY.BEARER)
  @put('/cart-items/{id}')
  @response(204, {
    description: 'CartItems PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cartItems: CartItems,
  ): Promise<void> {
    await this.cartItemsRepository.replaceById(id, cartItems);
  }
  @authorize({
    permissions: [PermissionKeys.DeleteCart],
  })
  @authenticate(STRATEGY.BEARER)
  @del('/cart-items/{id}')
  @response(204, {
    description: 'CartItems DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartItemsRepository.deleteById(id);
  }
}
