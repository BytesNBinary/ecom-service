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
import {ProductReview} from '../models';
import {ProductReviewRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class ProductReviewController {
  constructor(
    @repository(ProductReviewRepository)
    public productReviewRepository : ProductReviewRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateReview],
  })
  @post('/product-reviews')
  @response(200, {
    description: 'ProductReview model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductReview)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductReview, {
            title: 'NewProductReview',
            exclude: ['id'],
          }),
        },
      },
    })
    productReview: Omit<ProductReview, 'id'>,
  ): Promise<ProductReview> {
    return this.productReviewRepository.create(productReview);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewReview],
  })
  @get('/product-reviews/count')
  @response(200, {
    description: 'ProductReview model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductReview) where?: Where<ProductReview>,
  ): Promise<Count> {
    return this.productReviewRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewReview],
  })
  @get('/product-reviews')
  @response(200, {
    description: 'Array of ProductReview model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductReview, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductReview) filter?: Filter<ProductReview>,
  ): Promise<ProductReview[]> {
    return this.productReviewRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateReview],
  })
  @patch('/product-reviews')
  @response(200, {
    description: 'ProductReview PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductReview, {partial: true}),
        },
      },
    })
    productReview: ProductReview,
    @param.where(ProductReview) where?: Where<ProductReview>,
  ): Promise<Count> {
    return this.productReviewRepository.updateAll(productReview, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewReview],
  })
  @get('/product-reviews/{id}')
  @response(200, {
    description: 'ProductReview model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductReview, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductReview, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductReview>
  ): Promise<ProductReview> {
    return this.productReviewRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateReview],
  })
  @patch('/product-reviews/{id}')
  @response(204, {
    description: 'ProductReview PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductReview, {partial: true}),
        },
      },
    })
    productReview: ProductReview,
  ): Promise<void> {
    await this.productReviewRepository.updateById(id, productReview);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateReview],
  })
  @put('/product-reviews/{id}')
  @response(204, {
    description: 'ProductReview PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productReview: ProductReview,
  ): Promise<void> {
    await this.productReviewRepository.replaceById(id, productReview);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteReview],
  })
  @del('/product-reviews/{id}')
  @response(204, {
    description: 'ProductReview DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productReviewRepository.deleteById(id);
  }
}
