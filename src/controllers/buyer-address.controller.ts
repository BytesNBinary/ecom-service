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
import {PermissionKeys} from '../enum/permission-keys.enum';
import {BuyerAddress} from '../models';
import {BuyerAddressRepository} from '../repositories';

export class BuyerAddressController {
  constructor(
    @repository(BuyerAddressRepository)
    public buyerAddressRepository: BuyerAddressRepository,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateBuyerAddress],
  })
  @post('/buyer-addresses')
  @response(200, {
    description: 'BuyerAddress model instance',
    content: {'application/json': {schema: getModelSchemaRef(BuyerAddress)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuyerAddress, {
            title: 'NewBuyerAddress',
            exclude: ['id'],
          }),
        },
      },
    })
    buyerAddress: Omit<BuyerAddress, 'id'>,
  ): Promise<BuyerAddress> {
    return this.buyerAddressRepository.create(buyerAddress);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewBuyerAddress],
  })
  @get('/buyer-addresses/count')
  @response(200, {
    description: 'BuyerAddress model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BuyerAddress) where?: Where<BuyerAddress>,
  ): Promise<Count> {
    return this.buyerAddressRepository.count(where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewBuyerAddress],
  })
  @get('/buyer-addresses')
  @response(200, {
    description: 'Array of BuyerAddress model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BuyerAddress, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BuyerAddress) filter?: Filter<BuyerAddress>,
  ): Promise<BuyerAddress[]> {
    return this.buyerAddressRepository.find(filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateBuyerAddress],
  })
  @patch('/buyer-addresses')
  @response(200, {
    description: 'BuyerAddress PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuyerAddress, {partial: true}),
        },
      },
    })
    buyerAddress: BuyerAddress,
    @param.where(BuyerAddress) where?: Where<BuyerAddress>,
  ): Promise<Count> {
    return this.buyerAddressRepository.updateAll(buyerAddress, where);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewBuyerAddress],
  })
  @get('/buyer-addresses/{id}')
  @response(200, {
    description: 'BuyerAddress model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BuyerAddress, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(BuyerAddress, {exclude: 'where'})
    filter?: FilterExcludingWhere<BuyerAddress>,
  ): Promise<BuyerAddress> {
    return this.buyerAddressRepository.findById(id, filter);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateBuyerAddress],
  })
  @patch('/buyer-addresses/{id}')
  @response(204, {
    description: 'BuyerAddress PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuyerAddress, {partial: true}),
        },
      },
    })
    buyerAddress: BuyerAddress,
  ): Promise<void> {
    await this.buyerAddressRepository.updateById(id, buyerAddress);
  }

  @authenticate(STRATEGY.BEARER)
   @authorize({
    permissions: [PermissionKeys.UpdateBuyerAddress],
  })
  @put('/buyer-addresses/{id}')
  @response(204, {
    description: 'BuyerAddress PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() buyerAddress: BuyerAddress,
  ): Promise<void> {
    await this.buyerAddressRepository.replaceById(id, buyerAddress);
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteBuyerAddress],
  })
  @del('/buyer-addresses/{id}')
  @response(204, {
    description: 'BuyerAddress DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.buyerAddressRepository.deleteById(id);
  }
}
