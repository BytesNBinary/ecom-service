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
import {OptionType} from '../models';
import {OptionTypeRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class OptionTypeController {
  constructor(
    @repository(OptionTypeRepository)
    public optionTypeRepository : OptionTypeRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/option-types')
  @response(200, {
    description: 'OptionType model instance',
    content: {'application/json': {schema: getModelSchemaRef(OptionType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionType, {
            title: 'NewOptionType',
            exclude: ['id'],
          }),
        },
      },
    })
    optionType: Omit<OptionType, 'id'>,
  ): Promise<OptionType> {
    return this.optionTypeRepository.create(optionType);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-types/count')
  @response(200, {
    description: 'OptionType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OptionType) where?: Where<OptionType>,
  ): Promise<Count> {
    return this.optionTypeRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-types')
  @response(200, {
    description: 'Array of OptionType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OptionType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OptionType) filter?: Filter<OptionType>,
  ): Promise<OptionType[]> {
    return this.optionTypeRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/option-types')
  @response(200, {
    description: 'OptionType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionType, {partial: true}),
        },
      },
    })
    optionType: OptionType,
    @param.where(OptionType) where?: Where<OptionType>,
  ): Promise<Count> {
    return this.optionTypeRepository.updateAll(optionType, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/option-types/{id}')
  @response(200, {
    description: 'OptionType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OptionType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OptionType, {exclude: 'where'}) filter?: FilterExcludingWhere<OptionType>
  ): Promise<OptionType> {
    return this.optionTypeRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/option-types/{id}')
  @response(204, {
    description: 'OptionType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OptionType, {partial: true}),
        },
      },
    })
    optionType: OptionType,
  ): Promise<void> {
    await this.optionTypeRepository.updateById(id, optionType);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/option-types/{id}')
  @response(204, {
    description: 'OptionType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() optionType: OptionType,
  ): Promise<void> {
    await this.optionTypeRepository.replaceById(id, optionType);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/option-types/{id}')
  @response(204, {
    description: 'OptionType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.optionTypeRepository.deleteById(id);
  }
}
