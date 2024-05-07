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
import {OptionValue} from '../models';
import {OptionValueRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class OptionValueController {
  constructor(
    @repository(OptionValueRepository)
    public optionValueRepository : OptionValueRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/option-values')
  @response(200, {
    description: 'OptionValue model instance',
    content: {'application/json': {schema: getModelSchemaRef(OptionValue)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionValue, {
            title: 'NewOptionValue',
            exclude: ['id'],
          }),
        },
      },
    })
    optionValue: Omit<OptionValue, 'id'>,
  ): Promise<OptionValue> {
    return this.optionValueRepository.create(optionValue);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-values/count')
  @response(200, {
    description: 'OptionValue model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OptionValue) where?: Where<OptionValue>,
  ): Promise<Count> {
    return this.optionValueRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-values')
  @response(200, {
    description: 'Array of OptionValue model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OptionValue, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OptionValue) filter?: Filter<OptionValue>,
  ): Promise<OptionValue[]> {
    return this.optionValueRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/option-values')
  @response(200, {
    description: 'OptionValue PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionValue, {partial: true}),
        },
      },
    })
    optionValue: OptionValue,
    @param.where(OptionValue) where?: Where<OptionValue>,
  ): Promise<Count> {
    return this.optionValueRepository.updateAll(optionValue, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-values/{id}')
  @response(200, {
    description: 'OptionValue model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OptionValue, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OptionValue, {exclude: 'where'}) filter?: FilterExcludingWhere<OptionValue>
  ): Promise<OptionValue> {
    return this.optionValueRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/option-values/{id}')
  @response(204, {
    description: 'OptionValue PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionValue, {partial: true}),
        },
      },
    })
    optionValue: OptionValue,
  ): Promise<void> {
    await this.optionValueRepository.updateById(id, optionValue);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/option-values/{id}')
  @response(204, {
    description: 'OptionValue PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() optionValue: OptionValue,
  ): Promise<void> {
    await this.optionValueRepository.replaceById(id, optionValue);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/option-values/{id}')
  @response(204, {
    description: 'OptionValue DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.optionValueRepository.deleteById(id);
  }
}
