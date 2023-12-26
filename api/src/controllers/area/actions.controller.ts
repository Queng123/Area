import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ActionsService } from '../../services/area/actions.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('actions')
@ApiTags('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  @ApiOperation({ summary: 'Add new action in DB' })
  @ApiResponse({
    status: 201,
    description: 'success, action created',
  })
  async addAction(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [name, description, url, provider] = [request.body.name, request.body.description, request.body.url, request.body.provider];
      const [statusCode, message] = await this.actionsService.createAction(name, description, url, provider);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all actions' })
  @ApiResponse({
    status: 201,
    description: 'success, actions getted',
  })
  async getActions(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, actions] = await this.actionsService.getActions();

      console.log(`Status Code: ${statusCode}, Message: ${actions}`);
      return res.status(statusCode).json({ actions });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('star')
  @ApiOperation({ summary: 'Star action' })
  @ApiResponse({
    status: 201,
    description: 'success, action starred',
  })
  async starAction(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.starAction(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}