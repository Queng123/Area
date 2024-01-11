import { Controller, Get, HttpStatus, Post, Req, Res, Query, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReactionsService } from '../../services/area/reactions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('reactions')
@ApiTags('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

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
          example: 'Send mail',
        },
        description: {
          type: 'string',
          example: 'Send mail to user',
        },
        url: {
          type: 'string',
          example: 'http://api:8080/reaction/email',
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
      const [statusCode, message] = await this.reactionsService.createReaction(name, description, url, provider);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
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
  async getReactions(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, actions] = await this.reactionsService.getReactions();

      console.log(`Status Code: ${statusCode}, Message: ${actions}`);
      return res.status(statusCode).json({ reactions: actions });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('email')
  @ApiOperation({ summary: 'Send mail' })
  @ApiResponse({
    status: 201,
    description: 'success, mail send',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'test@test.test'
  })
  @ApiParam({
    name: 'action',
    required: true,
    description: 'Action link to this reaction',
    example: 'star'
  })
  async sendMail(@Res() res: Response, @Query('email') email, @Query('action') action, @Req()  req: Request ): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.sendMail(email, action, req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Delete(':reactionName')
  @ApiOperation({ summary: 'Delete reaction' })
  @ApiResponse({
    status: 201,
    description: 'success, reaction deleted',
  })
  @ApiParam({
    name: 'reactionName',
    required: true,
    description: 'Name of the reaction',
    example: 'email'
  })
  async deleteReaction(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.deleteReaction(request.params.reactionName);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('spotify')
  @ApiOperation({ summary: 'Start your last played spotify music' })
  @ApiResponse({
    status: 201,
    description: 'success, spotify music started',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'test@test.test',
  })
  @ApiParam({
    name: 'action',
    required: true,
    description: 'Action link to this reaction',
    example: 'star',
  })
  async startSpotify(@Res() res: Response, @Query('email') email, @Query('action') action, @Req()  req: Request ): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.startSpotify(email, action, req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('deezer')
  @ApiOperation({ summary: 'Starts a random track' })
  @ApiResponse({
    status: 201,
    description: 'success, deezer music started',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'email.someone@provider.com',
  })
  @ApiParam({
    name: 'action',
    required: true,
    description: 'Action link to this reaction',
    example: 'star',
  })
  async startDeezer(@Res() res: Response, @Query('email') email, @Query('action') action, @Req()  req: Request ): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.startDeezer(email, action, req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('recommandation')
  @ApiOperation({ summary: 'Send spotify custom recommandation' })
  @ApiResponse({
    status: 201,
    description: 'success, spotify custom recommandation sent',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'test@test.test',
  })
  @ApiParam({
    name: 'action',
    required: true,
    description: 'Action link to this reaction',
    example: 'star',
  })
  async sendSpotifyRecommandation(@Res() res: Response, @Query('email') email, @Query('action') action, @Req()  req: Request ): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.getSpotifyRecommendations(email, action, req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }

  }

  @Post('github')
  @ApiOperation({ summary: 'Change user status to busy' })
  @ApiResponse({
    status: 201,
    description: 'success, user status changed',
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Email of the user',
    example: 'test@test.test',
  })
  @ApiParam({
    name: 'action',
    required: true,
    description: 'Action link to this reaction',
    example: 'star',
  })
  async changeStatus(@Res() res: Response, @Query('email') email, @Query('action') action, @Req()  req: Request ): Promise<Response> {
    try {
      const [statusCode, message] = await this.reactionsService.changeStatus(email, action, req.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during provider creation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}