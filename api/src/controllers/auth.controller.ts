import { Controller, Get, UseGuards, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'launch the google OAuth2.0 process' })
  async loginGoogle() {
    //
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'log the user in google provider' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.googleLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'launch the github OAuth2.0 process' })
  async loginGithub() {
    //
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'log the user in github provider' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async githubAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.githubLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }


  @Get('teams')
  @UseGuards(AuthGuard('MSTeams'))
  @ApiOperation({ summary: 'launch the teams OAuth2.0 process' })
  async loginTeams() {
    //
  }

  @Get('teams/callback')
  @UseGuards(AuthGuard('MSTeams'))
  @ApiOperation({ summary: 'Handle teams callback process' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged in.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async teamsAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.MSTeamsLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}