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
import {WishlistItems} from '../models';
import {WishlistItemsRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class WishlistItemsController {
  constructor(
    @repository(WishlistItemsRepository)
    public wishlistItemsRepository : WishlistItemsRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/wishlist-items')
  @response(200, {
    description: 'WishlistItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(WishlistItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistItems, {
            title: 'NewWishlistItems',
            exclude: ['id'],
          }),
        },
      },
    })
    wishlistItems: Omit<WishlistItems, 'id'>,
  ): Promise<WishlistItems> {
    return this.wishlistItemsRepository.create(wishlistItems);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/wishlist-items/count')
  @response(200, {
    description: 'WishlistItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WishlistItems) where?: Where<WishlistItems>,
  ): Promise<Count> {
    return this.wishlistItemsRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/wishlist-items')
  @response(200, {
    description: 'Array of WishlistItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WishlistItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WishlistItems) filter?: Filter<WishlistItems>,
  ): Promise<WishlistItems[]> {
    return this.wishlistItemsRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/wishlist-items')
  @response(200, {
    description: 'WishlistItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistItems, {partial: true}),
        },
      },
    })
    wishlistItems: WishlistItems,
    @param.where(WishlistItems) where?: Where<WishlistItems>,
  ): Promise<Count> {
    return this.wishlistItemsRepository.updateAll(wishlistItems, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/wishlist-items/{id}')
  @response(200, {
    description: 'WishlistItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WishlistItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WishlistItems, {exclude: 'where'}) filter?: FilterExcludingWhere<WishlistItems>
  ): Promise<WishlistItems> {
    return this.wishlistItemsRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/wishlist-items/{id}')
  @response(204, {
    description: 'WishlistItems PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WishlistItems, {partial: true}),
        },
      },
    })
    wishlistItems: WishlistItems,
  ): Promise<void> {
    await this.wishlistItemsRepository.updateById(id, wishlistItems);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/wishlist-items/{id}')
  @response(204, {
    description: 'WishlistItems PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() wishlistItems: WishlistItems,
  ): Promise<void> {
    await this.wishlistItemsRepository.replaceById(id, wishlistItems);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/wishlist-items/{id}')
  @response(204, {
    description: 'WishlistItems DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wishlistItemsRepository.deleteById(id);
  }
}
