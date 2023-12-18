import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'log the user in google provider' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.appService.googleLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}