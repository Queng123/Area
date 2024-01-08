import { Controller, Get, HttpStatus, Post, Req, Res, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { ActionsService } from '../../services/area/actions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
  @ApiBody({
    description: 'Name, description, url and provider of the action to register.',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'star',
          description: 'Name of the action',
        },
        description: {
          type: 'string',
          example: 'Star a repository',
          description: 'Description of the action',
        },
        url: {
          type: 'string',
          example: 'http://api:8080/action/star',
          description: 'Url of the action',
        },
        provider: {
          type: 'string',
          example: 'Github',
        },
      },
      required: ['name', 'description', 'url'],
    },
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
  @ApiResponse({
    status: 401,
    description: 'User not logged in.',
  })
  @ApiBody({
    description: 'Webhook endpoint of the action to star.',
    schema: {
      type: 'object',
      properties: {
        webhookEndpoint: {
          type: 'string',
          example: 'http://api:8080/reaction/email',
          description: 'url for the reaction',
        },
        user: {
          type: 'string',
          example: 'user@test.test',
          description: 'user for the action',
        }
      },
      required: ['webhookEndpoint', 'user'],
    },
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

  @Delete('star')
  @ApiOperation({ summary: 'Unstar action' })
  @ApiResponse({
    status: 201,
    description: 'success, action unstarred',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged in.',
  })
  @ApiBody({
    description: 'Webhook endpoint of the action to unstar.',
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          example: 'user@test.test',
          description: 'user for the action',
        }
      },
      required: ['webhookEndpoint', 'user'],
    },
  })
  async unstarAction(@Res() res: Response, @Req() req: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.unstarAction(req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Delete(':actionName')
  @ApiOperation({ summary: 'Delete action' })
  @ApiResponse({
    status: 200,
    description: 'success, action deleted',
  })
  async deleteAction(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.deleteAction(request.params.actionName);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('email')
  @ApiOperation({ summary: 'Check if email is received' })
  @ApiResponse({
    status: 200,
    description: 'success, email received',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged in.',
  })
  @ApiBody({
    description: 'Webhook endpoint of the action email.',
    schema: {
      type: 'object',
      properties: {
        webhookEndpoint: {
          type: 'string',
          example: 'http://api:8080/reaction/email',
          description: 'url for the reaction',
        },
        user: {
          type: 'string',
          example: 'user@test.test',
          description: 'user for the action',
        }
      },
      required: ['webhookEndpoint', 'user'],
    },
  })
  async receivedEmail(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.receivedEmail(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post('meteo')
  @ApiOperation({ summary: 'Get current meteo' })
  @ApiResponse({
    status: 201,
    description: 'success, meteo getted',
  })
  @ApiBody({
    description: 'Webhook endpoint of the action meteo.',
    schema: {
      type: 'object',
      properties: {
        webhookEndpoint: {
          type: 'string',
          example: 'http://api:8080/reaction/email',
          description: 'url for the reaction',
        },
        user: {
          type: 'string',
          example: 'test@test.test',
          description: 'user for the action',
        }
      },
      required: ['webhookEndpoint', 'user'],
    },
  })
  async getMeteo(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.getMeteo(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post('pr')
  @ApiOperation({ summary: 'Trigger if there is new pr' })
  @ApiResponse({
    status: 201,
    description: 'success, pr getted',
  })
  @ApiBody({
    description: 'Webhook endpoint of the action pr.',
    schema: {
      type: 'object',
      properties: {
        webhookEndpoint: {
          type: 'string',
          example: 'http://api:8080/reaction/email',
          description: 'url for the reaction',
        },
        user: {
          type: 'string',
          example: 'test@test.test',
          description: 'user for the action',
        }
      },
      required: ['webhookEndpoint', 'user'],
    },
  })
  async getPr(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.actionsService.getPr(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}