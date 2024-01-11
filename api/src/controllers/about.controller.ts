import { Controller, HttpStatus, Req, Res, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { AboutService } from '../services/about.service';

@Controller('')
@ApiTags('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get('about.json')
  @ApiOperation({ summary: 'sent the about.json file' })
  @ApiResponse({
    status: 200,
    description: 'about.json file sent.',
  })
  async getAbout(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.aboutService.getAbout();
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json(message);
    } catch (error) {
      console.error('Error during about.json sending:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}