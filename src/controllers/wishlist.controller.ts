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
import {Wishlist} from '../models';
import {WishlistRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class WishlistController {
  constructor(
    @repository(WishlistRepository)
    public wishlistRepository : WishlistRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateWishlist],
  })
  @post('/wishlists')
  @response(200, {
    description: 'Wishlist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Wishlist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {
            title: 'NewWishlist',
            exclude: ['id'],
          }),
        },
      },
    })
    wishlist: Omit<Wishlist, 'id'>,
  ): Promise<Wishlist> {
    return this.wishlistRepository.create(wishlist);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewWishlist],
  })
  @get('/wishlists/count')
  @response(200, {
    description: 'Wishlist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Wishlist) where?: Where<Wishlist>,
  ): Promise<Count> {
    return this.wishlistRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewWishlist],
  })
  @get('/wishlists')
  @response(200, {
    description: 'Array of Wishlist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Wishlist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Wishlist) filter?: Filter<Wishlist>,
  ): Promise<Wishlist[]> {
    return this.wishlistRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateWishlist],
  })
  @patch('/wishlists')
  @response(200, {
    description: 'Wishlist PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {partial: true}),
        },
      },
    })
    wishlist: Wishlist,
    @param.where(Wishlist) where?: Where<Wishlist>,
  ): Promise<Count> {
    return this.wishlistRepository.updateAll(wishlist, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewWishlist],
  })
  @get('/wishlists/{id}')
  @response(200, {
    description: 'Wishlist model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Wishlist, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Wishlist, {exclude: 'where'}) filter?: FilterExcludingWhere<Wishlist>
  ): Promise<Wishlist> {
    return this.wishlistRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateWishlist],
  })
  @patch('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {partial: true}),
        },
      },
    })
    wishlist: Wishlist,
  ): Promise<void> {
    await this.wishlistRepository.updateById(id, wishlist);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateWishlist],
  })
  @put('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() wishlist: Wishlist,
  ): Promise<void> {
    await this.wishlistRepository.replaceById(id, wishlist);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteWishlist],
  })
  @del('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wishlistRepository.deleteById(id);
  }
}
