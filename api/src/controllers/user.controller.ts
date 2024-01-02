import {
  Controller,
  Delete,
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
  ApiResponse,
  ApiBody
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
  @ApiResponse({
    status: 409,
    description: 'User already exists.',
  })
  @ApiBody({
    description: 'Email, password and username of the user to register.',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'test@test.test',
        },
        password: {
          type: 'string',
          example: 'password',
        },
        username: {
          type: 'string',
          example: 'jean',
        },
      },
      required: ['email', 'password'],
    },
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
  @ApiResponse({
    status: 400,
    description: 'Wrong email or password. Or user not verified.',
  })
  @ApiResponse({
    status: 409,
    description: 'User already logged in.',
  })
  @ApiBody({
    description: 'Email and password of the user to log in.',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'test@test.test',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
      required: ['email', 'password'],
    },
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
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
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
  @ApiBody({
    description: 'Email of the user to reset the password of.',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'test@test.test',
        },
      },
      required: ['email'],
    },
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
  @ApiBody({
    description: 'New password of the user.',
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          example: 'new password',
        },
      },
      required: ['password'],
    },
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

  @Delete()
  @ApiOperation({ summary: 'Deletes the current user account.' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted.',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
  })
  async delete(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.deleteUser();
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user deletion:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Gets the user name.' })
  @ApiResponse({
    status: 200,
    description: 'Username',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
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

  @Get('services')
  @ApiOperation({ summary: 'Gets the user services status (connected/not connected)' })
  @ApiResponse({
    status: 200,
    description: 'User services status',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
  })
  async getUserService(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.getUserService();
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user service status retrieval:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }

  @Delete('services')
  @ApiOperation({ summary: 'Deletes a user service' })
  @ApiResponse({
    status: 200,
    description: 'User service deleted',
  })
  @ApiResponse({
    status: 409,
    description: 'User not logged in.',
  })
  @ApiBody({
    description: 'Name of the service to delete',
    schema: {
      type: 'object',
      properties: {
        service: {
          type: 'string',
          example: 'github',
        },
      },
      required: ['service'],
    },
  })
  async deleteUserService(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.userService.deleteUserProvider(request.body);
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user service deletion:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}
