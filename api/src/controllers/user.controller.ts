import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res
} from '@nestjs/common';
import {
  Request,
  Response
} from 'express';
import { UserService } from '../services/user.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register/email')
  @ApiOperation({ summary: 'Registers a user on the application to obtain an account, using email.' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
  })
  async registerEmail(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.createUserWithEmail(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
        console.error('Error during user creation:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('login/email')
  @ApiOperation({ summary: 'Logs a user into the application, using email.' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  })
  async loginEmail(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.loginUserWithEmail(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('login/google')
  @ApiOperation({ summary: 'Logs a user into the application, using Google.' })
  @ApiResponse({
    status: 200,
    description: 'Send the google login url.',
  })
  async loginGoogle(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.loginUserWithGoogle(request.body);

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logs a user out of the application.' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged out.',
  })
  async logout(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.logoutUser();

      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
        console.error('Error during user logout:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Sends a password reset email to the user.' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent.',
  })
  async resetPassword(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const { email } = request.body;
      await this.userService.resetPassword(email);

      return res.status(HttpStatus.OK).json({ message: 'Password reset email sent.' });
    } catch (error) {
      console.error('Error during user password reset:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Updates the user password.' })
  @ApiResponse({
    status: 200,
    description: 'Password updated.',
  })
  async updatePassword(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.updatePassword(request.body);
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user password update:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets the user name.' })
  @ApiResponse({
    status: 200,
    description: 'Username',
  })
  async getUserName(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.getUserName();
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user name retrieval:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}
