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
import {OrderItems} from '../models';
import {OrderItemsRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';

export class OrderItemsController {
  constructor(
    @repository(OrderItemsRepository)
    public orderItemsRepository : OrderItemsRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @post('/order-items')
  @response(200, {
    description: 'OrderItems model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderItems)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItems, {
            title: 'NewOrderItems',
            exclude: ['id'],
          }),
        },
      },
    })
    orderItems: Omit<OrderItems, 'id'>,
  ): Promise<OrderItems> {
    return this.orderItemsRepository.create(orderItems);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-items/count')
  @response(200, {
    description: 'OrderItems model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderItems) where?: Where<OrderItems>,
  ): Promise<Count> {
    return this.orderItemsRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-items')
  @response(200, {
    description: 'Array of OrderItems model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderItems, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderItems) filter?: Filter<OrderItems>,
  ): Promise<OrderItems[]> {
    return this.orderItemsRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/order-items')
  @response(200, {
    description: 'OrderItems PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItems, {partial: true}),
        },
      },
    })
    orderItems: OrderItems,
    @param.where(OrderItems) where?: Where<OrderItems>,
  ): Promise<Count> {
    return this.orderItemsRepository.updateAll(orderItems, where);
  }
  @authenticate(STRATEGY.BEARER)
  @get('/order-items/{id}')
  @response(200, {
    description: 'OrderItems model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderItems, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(OrderItems, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderItems>
  ): Promise<OrderItems> {
    return this.orderItemsRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @patch('/order-items/{id}')
  @response(204, {
    description: 'OrderItems PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderItems, {partial: true}),
        },
      },
    })
    orderItems: OrderItems,
  ): Promise<void> {
    await this.orderItemsRepository.updateById(id, orderItems);
  }
  @authenticate(STRATEGY.BEARER)
  @put('/order-items/{id}')
  @response(204, {
    description: 'OrderItems PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() orderItems: OrderItems,
  ): Promise<void> {
    await this.orderItemsRepository.replaceById(id, orderItems);
  }
  @authenticate(STRATEGY.BEARER)
  @del('/order-items/{id}')
  @response(204, {
    description: 'OrderItems DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.orderItemsRepository.deleteById(id);
  }
}
