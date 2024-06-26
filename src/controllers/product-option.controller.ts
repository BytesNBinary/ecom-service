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
import {ProductOption} from '../models';
import {ProductOptionRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class ProductOptionController {
  constructor(
    @repository(ProductOptionRepository)
    public productOptionRepository : ProductOptionRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateProduct],
  })
  @post('/product-options')
  @response(200, {
    description: 'ProductOption model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductOption)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {
            title: 'NewProductOption',
            exclude: ['id'],
          }),
        },
      },
    })
    productOption: Omit<ProductOption, 'id'>,
  ): Promise<ProductOption> {
    return this.productOptionRepository.create(productOption);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/product-options/count')
  @response(200, {
    description: 'ProductOption model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductOption) where?: Where<ProductOption>,
  ): Promise<Count> {
    return this.productOptionRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/product-options')
  @response(200, {
    description: 'Array of ProductOption model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductOption, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductOption) filter?: Filter<ProductOption>,
  ): Promise<ProductOption[]> {
    return this.productOptionRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @patch('/product-options')
  @response(200, {
    description: 'ProductOption PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {partial: true}),
        },
      },
    })
    productOption: ProductOption,
    @param.where(ProductOption) where?: Where<ProductOption>,
  ): Promise<Count> {
    return this.productOptionRepository.updateAll(productOption, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/product-options/{id}')
  @response(200, {
    description: 'ProductOption model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductOption, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductOption, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductOption>
  ): Promise<ProductOption> {
    return this.productOptionRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @patch('/product-options/{id}')
  @response(204, {
    description: 'ProductOption PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {partial: true}),
        },
      },
    })
    productOption: ProductOption,
  ): Promise<void> {
    await this.productOptionRepository.updateById(id, productOption);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @put('/product-options/{id}')
  @response(204, {
    description: 'ProductOption PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productOption: ProductOption,
  ): Promise<void> {
    await this.productOptionRepository.replaceById(id, productOption);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteProduct],
  })
  @del('/product-options/{id}')
  @response(204, {
    description: 'ProductOption DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productOptionRepository.deleteById(id);
  }
}
