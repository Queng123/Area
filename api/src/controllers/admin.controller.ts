import {
  Controller,
  HttpStatus,
  Req,
  Res,
  Delete
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('delete/user')
  @ApiOperation({ summary: 'Deletes the user account.' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted.',
  })
  async delete(@Res() res: Response, @Req() request: Request): Promise<Response> {
    try {
      const [statusCode, message] = await this.adminService.deleteUser(request.body.id);
      console.log(`Status Code: ${statusCode}, Message: ${message}`);
      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error('Error during user deletion:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error, internal server error' });
    }
  }
}
