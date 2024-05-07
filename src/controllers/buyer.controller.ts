import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';
import {Buyer} from '../models';
import {BuyerRepository} from '../repositories';

export class BuyerController {
  constructor(
    @repository(BuyerRepository)
    public buyerRepository: BuyerRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateBuyer],
  })
  @post('/buyers')
  @response(200, {
    description: 'Buyer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Buyer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buyer, {
            title: 'NewBuyer',
            exclude: ['id'],
          }),
        },
      },
    })
    buyer: Omit<Buyer, 'id'>,
  ): Promise<Buyer> {
    return this.buyerRepository.create(buyer);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewBuyer],
  })
  @get('/buyers/count')
  @response(200, {
    description: 'Buyer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Buyer) where?: Where<Buyer>): Promise<Count> {
    return this.buyerRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewBuyer],
  })
  @get('/buyers')
  @response(200, {
    description: 'Array of Buyer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Buyer, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Buyer) filter?: Filter<Buyer>): Promise<Buyer[]> {
    return this.buyerRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateBuyer],
  })
  @patch('/buyers')
  @response(200, {
    description: 'Buyer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buyer, {partial: true}),
        },
      },
    })
    buyer: Buyer,
    @param.where(Buyer) where?: Where<Buyer>,
  ): Promise<Count> {
    return this.buyerRepository.updateAll(buyer, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewAnyBuyer],
  })
  @get('/buyers/{id}')
  @response(200, {
    description: 'Buyer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Buyer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Buyer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Buyer>,
  ): Promise<Buyer> {
    return this.buyerRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateBuyer],
  })
  @patch('/buyers/{id}')
  @response(204, {
    description: 'Buyer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buyer, {partial: true}),
        },
      },
    })
    buyer: Buyer,
  ): Promise<void> {
    await this.buyerRepository.updateById(id, buyer);
  }

  @authenticate(STRATEGY.BEARER, {})
  @authorize({
    permissions: [PermissionKeys.UpdateBuyer],
  })
  @put('/buyers/{id}')
  @response(204, {
    description: 'Buyer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() buyer: Buyer,
  ): Promise<void> {
    await this.buyerRepository.replaceById(id, buyer);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteBuyer],
  })
  @del('/buyers/{id}')
  @response(204, {
    description: 'Buyer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.buyerRepository.deleteById(id);
  }
}
