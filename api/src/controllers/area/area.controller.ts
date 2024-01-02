import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AreaService } from '../../services/area/area.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async calculateArea(@Param('action') action: string, @Param('reaction') reaction: string): Promise<[number, string]> {
    try {
      const result = this.areaService.generateArea(action, reaction);
      return result;
    } catch (error) {
      return [error.status, error.message];
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
  async deleteArea(@Param('action') action: string, @Param('reaction') reaction: string): Promise<[number, string]> {
    try {
      const result = this.areaService.deleteArea(action, reaction);
      return result;
    } catch (error) {
      return [error.status, error.message];
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
  async getArea(): Promise<[number, string]> {
    try {
      const result = this.areaService.getAreas();
      return result;
    } catch (error) {
      return [error.status, error.message];
    }
  }
}