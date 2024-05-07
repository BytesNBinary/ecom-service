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
import {SubCategory} from '../models';
import {SubCategoryRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class SubCategoryController {
  constructor(
    @repository(SubCategoryRepository)
    public subCategoryRepository : SubCategoryRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/sub-categories')
  @response(200, {
    description: 'SubCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(SubCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubCategory, {
            title: 'NewSubCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    subCategory: Omit<SubCategory, 'id'>,
  ): Promise<SubCategory> {
    return this.subCategoryRepository.create(subCategory);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/sub-categories/count')
  @response(200, {
    description: 'SubCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SubCategory) where?: Where<SubCategory>,
  ): Promise<Count> {
    return this.subCategoryRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/sub-categories')
  @response(200, {
    description: 'Array of SubCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SubCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SubCategory) filter?: Filter<SubCategory>,
  ): Promise<SubCategory[]> {
    return this.subCategoryRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/sub-categories')
  @response(200, {
    description: 'SubCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubCategory, {partial: true}),
        },
      },
    })
    subCategory: SubCategory,
    @param.where(SubCategory) where?: Where<SubCategory>,
  ): Promise<Count> {
    return this.subCategoryRepository.updateAll(subCategory, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/sub-categories/{id}')
  @response(200, {
    description: 'SubCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SubCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SubCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<SubCategory>
  ): Promise<SubCategory> {
    return this.subCategoryRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubCategory, {partial: true}),
        },
      },
    })
    subCategory: SubCategory,
  ): Promise<void> {
    await this.subCategoryRepository.updateById(id, subCategory);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subCategory: SubCategory,
  ): Promise<void> {
    await this.subCategoryRepository.replaceById(id, subCategory);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/sub-categories/{id}')
  @response(204, {
    description: 'SubCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subCategoryRepository.deleteById(id);
  }
}
