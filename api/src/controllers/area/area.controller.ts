import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AreaService } from '../../services/area/area.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get(':action-:reaction')
  @ApiOperation({ summary: 'Create new area' })
  @ApiResponse({
    status: 201,
    description: 'success, area created',
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
  async getArea(): Promise<[number, string]> {
    try {
      const result = this.areaService.getAreas();
      return result;
    } catch (error) {
      return [error.status, error.message];
    }
  }
}