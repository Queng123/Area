import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProviderService } from '../services/provider.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('provider')
@ApiTags('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post('new')
  @ApiOperation({ summary: 'Register new provider' })
  @ApiResponse({
    status: 201,
    description: 'success, Provider created',
  })
  async signupEmail(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [name, description, url] = [request.body.name, request.body.description, request.body.url];
      const [statusCode, message] = await this.providerService.createProvider(name, description, url);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}