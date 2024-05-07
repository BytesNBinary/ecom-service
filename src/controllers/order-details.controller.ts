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
import {OrderDetails} from '../models';
import {OrderDetailsRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class OrderDetailsController {
  constructor(
    @repository(OrderDetailsRepository)
    public orderDetailsRepository : OrderDetailsRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/order-details')
  @response(200, {
    description: 'OrderDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {
            title: 'NewOrderDetails',
            exclude: ['id'],
          }),
        },
      },
    })
    orderDetails: Omit<OrderDetails, 'id'>,
  ): Promise<OrderDetails> {
    return this.orderDetailsRepository.create(orderDetails);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-details/count')
  @response(200, {
    description: 'OrderDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderDetails) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-details')
  @response(200, {
    description: 'Array of OrderDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderDetails) filter?: Filter<OrderDetails>,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/order-details')
  @response(200, {
    description: 'OrderDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
    @param.where(OrderDetails) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.updateAll(orderDetails, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-details/{id}')
  @response(200, {
    description: 'OrderDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderDetails>
  ): Promise<OrderDetails> {
    return this.orderDetailsRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.updateById(id, orderDetails);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.replaceById(id, orderDetails);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderDetailsRepository.deleteById(id);
  }
}
