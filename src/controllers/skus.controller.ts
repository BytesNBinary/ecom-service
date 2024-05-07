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
import {Skus} from '../models';
import {SkusRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class SkusController {
  constructor(
    @repository(SkusRepository)
    public skusRepository : SkusRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/skuses')
  @response(200, {
    description: 'Skus model instance',
    content: {'application/json': {schema: getModelSchemaRef(Skus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skus, {
            title: 'NewSkus',
            exclude: ['id'],
          }),
        },
      },
    })
    skus: Omit<Skus, 'id'>,
  ): Promise<Skus> {
    return this.skusRepository.create(skus);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/skuses/count')
  @response(200, {
    description: 'Skus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Skus) where?: Where<Skus>,
  ): Promise<Count> {
    return this.skusRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/skuses')
  @response(200, {
    description: 'Array of Skus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Skus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Skus) filter?: Filter<Skus>,
  ): Promise<Skus[]> {
    return this.skusRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/skuses')
  @response(200, {
    description: 'Skus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skus, {partial: true}),
        },
      },
    })
    skus: Skus,
    @param.where(Skus) where?: Where<Skus>,
  ): Promise<Count> {
    return this.skusRepository.updateAll(skus, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/skuses/{id}')
  @response(200, {
    description: 'Skus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Skus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Skus, {exclude: 'where'}) filter?: FilterExcludingWhere<Skus>
  ): Promise<Skus> {
    return this.skusRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/skuses/{id}')
  @response(204, {
    description: 'Skus PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skus, {partial: true}),
        },
      },
    })
    skus: Skus,
  ): Promise<void> {
    await this.skusRepository.updateById(id, skus);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/skuses/{id}')
  @response(204, {
    description: 'Skus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() skus: Skus,
  ): Promise<void> {
    await this.skusRepository.replaceById(id, skus);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/skuses/{id}')
  @response(204, {
    description: 'Skus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.skusRepository.deleteById(id);
  }
}
