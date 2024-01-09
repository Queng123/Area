import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProviderService } from '../services/provider.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('provider')
@ApiTags('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post('new')
  @ApiOperation({ summary: 'Register new provider in DB' })
  @ApiResponse({
    status: 201,
    description: 'success, Provider created',
  })
  @ApiBody({
    description: 'Name, description and url of the provider to register.',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Github',
        },
        description: {
          type: 'string',
          example: 'Github',
        },
        url: {
          type: 'string',
          example: 'https://github.com',
        },
      },
      required: ['name', 'description', 'url'],
    },
  })
  async signupEmail(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [name, description, url] = [request.body.name, request.body.description, request.body.url];
      const [statusCode, message] = await this.providerService.createProvider(name, description, url);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}