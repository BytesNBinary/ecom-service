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
import {Media} from '../models';
import {MediaRepository} from '../repositories';
import { authenticate, STRATEGY } from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKeys} from '../enum';

export class MediaController {
  constructor(
    @repository(MediaRepository)
    public mediaRepositoryRepository : MediaRepository,
  ) {}
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.CreateProduct],
  })
  @post('/media')
  @response(200, {
    description: 'Media model instance',
    content: {'application/json': {schema: getModelSchemaRef(Media)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Media, {
            title: 'NewMedia',
            exclude: ['id'],
          }),
        },
      },
    })
    media: Omit<Media, 'id'>,
  ): Promise<Media> {
    return this.mediaRepositoryRepository.create(media);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/media/count')
  @response(200, {
    description: 'Media model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Media) where?: Where<Media>,
  ): Promise<Count> {
    return this.mediaRepositoryRepository.count(where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/media')
  @response(200, {
    description: 'Array of Media model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Media, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Media) filter?: Filter<Media>,
  ): Promise<Media[]> {
    return this.mediaRepositoryRepository.find(filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @patch('/media')
  @response(200, {
    description: 'Media PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Media, {partial: true}),
        },
      },
    })
    media: Media,
    @param.where(Media) where?: Where<Media>,
  ): Promise<Count> {
    return this.mediaRepositoryRepository.updateAll(media, where);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.ViewProduct],
  })
  @get('/media/{id}')
  @response(200, {
    description: 'Media model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Media, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Media, {exclude: 'where'}) filter?: FilterExcludingWhere<Media>
  ): Promise<Media> {
    return this.mediaRepositoryRepository.findById(id, filter);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @patch('/media/{id}')
  @response(204, {
    description: 'Media PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Media, {partial: true}),
        },
      },
    })
    media: Media,
  ): Promise<void> {
    await this.mediaRepositoryRepository.updateById(id, media);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.UpdateProduct],
  })
  @put('/media/{id}')
  @response(204, {
    description: 'Media PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() media: Media,
  ): Promise<void> {
    await this.mediaRepositoryRepository.replaceById(id, media);
  }
  @authenticate(STRATEGY.BEARER)
  @authorize({
    permissions: [PermissionKeys.DeleteProduct],
  })
  @del('/media/{id}')
  @response(204, {
    description: 'Media DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mediaRepositoryRepository.deleteById(id);
  }
}
