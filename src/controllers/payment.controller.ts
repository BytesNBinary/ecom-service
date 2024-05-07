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
import {Payment} from '../models';
import {PaymentRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class PaymentController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository : PaymentRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreatePayment],
  })
  @post('/payments')
  @response(200, {
    description: 'Payment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Payment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
            exclude: ['id'],
          }),
        },
      },
    })
    payment: Omit<Payment, 'id'>,
  ): Promise<Payment> {
    return this.paymentRepository.create(payment);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewPayment],
  })
  @get('/payments/count')
  @response(200, {
    description: 'Payment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Payment) where?: Where<Payment>,
  ): Promise<Count> {
    return this.paymentRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewPayment],
  })
  @get('/payments')
  @response(200, {
    description: 'Array of Payment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Payment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Payment) filter?: Filter<Payment>,
  ): Promise<Payment[]> {
    return this.paymentRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdatePayment],
  })
  @patch('/payments')
  @response(200, {
    description: 'Payment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
    @param.where(Payment) where?: Where<Payment>,
  ): Promise<Count> {
    return this.paymentRepository.updateAll(payment, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewPayment],
  })
  @get('/payments/{id}')
  @response(200, {
    description: 'Payment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Payment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Payment, {exclude: 'where'}) filter?: FilterExcludingWhere<Payment>
  ): Promise<Payment> {
    return this.paymentRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdatePayment],
  })
  @patch('/payments/{id}')
  @response(204, {
    description: 'Payment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true}),
        },
      },
    })
    payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.updateById(id, payment);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdatePayment],
  })
  @put('/payments/{id}')
  @response(204, {
    description: 'Payment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() payment: Payment,
  ): Promise<void> {
    await this.paymentRepository.replaceById(id, payment);
  }
@authenticate(STRATEGY.BEARER)
@authorize({
  permissions: [PermissionKeys.DeletePayment],
})
  @del('/payments/{id}')
  @response(204, {
    description: 'Payment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }
}
