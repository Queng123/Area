import { Controller, Get, Param } from '@nestjs/common';
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
}