import { Controller, Get, HttpStatus, Param, Res, Delete } from '@nestjs/common';
import { AreaService } from '../../services/area/area.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('area')
@ApiTags('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get(':action-:reaction')
  @ApiOperation({ summary: 'Create new area' })
  @ApiResponse({
    status: 201,
    description: 'success, area created',
  })
  @ApiResponse({
    status: 409,
    description: 'Area already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged',
  })
  @ApiParam({
    name: 'action',
    type: String,
    description: 'Action to trigger',
    example: 'star',
  })
  @ApiParam({
    name: 'reaction',
    type: String,
    description: 'Reaction to trigger',
    example: 'email',
  })
  async calculateArea(@Res() res: Response, @Param('action') action: string, @Param('reaction') reaction: string): Promise<Response> {
    try {
      const [statusCode, message] = await this.areaService.generateArea(action, reaction);

      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Delete(':action-:reaction')
  @ApiOperation({ summary: 'Delete one area' })
  @ApiResponse({
    status: 201,
    description: 'success, area deleted',
  })
  @ApiResponse({
    status: 409,
    description: 'Area already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged',
  })
  @ApiParam({
    name: 'action',
    type: String,
    description: 'Action to trigger',
    example: 'star',
  })
  @ApiParam({
    name: 'reaction',
    type: String,
    description: 'Reaction to trigger',
    example: 'email',
  })
  async deleteArea(@Res() res: Response, @Param('action') action: string, @Param('reaction') reaction: string): Promise<Response> {
    try {
      const [statusCode, message] = await this.areaService.deleteArea(action, reaction);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get()
  @ApiOperation({ summary: 'get areas for one user' })
  @ApiResponse({
    status: 201,
    description: 'success, areas getted',
  })
  @ApiResponse({
    status: 401,
    description: 'User not logged',
  })
  @ApiResponse({
    status: 404,
    description: 'No areas found',
  })
  async getArea(@Res() res: Response): Promise<Response> {
    try {
      const [statusCode, message] = await this.areaService.getAreas();
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}