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
  @ApiOperation({ summary: 'Launch the google OAuth2.0 process' })
  async loginGoogle() {
    //
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle the Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: 409,
    description: 'User already connected with google.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged in.',
  })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.googleLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Launch the github OAuth2.0 process' })
  async loginGithub() {
    //
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ summary: 'Handle the Github OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: 409,
    description: 'User already connected with github.',
  })
  @ApiResponse({
    status: 401,
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
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }


  @Get('teams')
  @UseGuards(AuthGuard('MSTeams'))
  @ApiOperation({ summary: 'Launch the MSTeams OAuth2.0 process' })
  async loginTeams() {
    //
  }

  @Get('teams/callback')
  @UseGuards(AuthGuard('MSTeams'))
  @ApiOperation({ summary: 'Handle MSTeams callback process' })
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
  @ApiResponse({
    status: 409,
    description: 'User already connected with MSteams.',
  })
  async teamsAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.MSTeamsLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  @ApiOperation({ summary: 'Launch the spotify OAuth2.0 process' })
  async loginSpotify() {
    //
  }

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  @ApiOperation({ summary: 'Handle the OAuth callback from spotify' })
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
  @ApiResponse({
    status: 409,
    description: 'User already connected with spotify.',
  })
  async spotifyAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.spotifyLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  @ApiOperation({ summary: 'Launch the discord OAuth2.0 process' })
  async loginDiscord() {
    //
  }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  @ApiOperation({ summary: 'Handle the OAuth callback from discord' })
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
  @ApiResponse({
    status: 409,
    description: 'User already connected with discord.',
  })
  async discordAuthRedirect(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.authService.discordLogin(req)
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}