import { Controller, Get, Param } from '@nestjs/common';
import { WebhookService } from '../../services/area/webhook.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('webhook')
@ApiTags('webhook')
export class WebhookController {
  constructor(private readonly webhoooksService: WebhookService) {}

  @Get(':timer')
  @ApiOperation({ summary: 'get webhook for every actions' })
  @ApiResponse({
    status: 201,
    description: 'success, webhook getted',
  })
  async getWebhook(@Param('timer') timer: string): Promise<[number, string]> {
    try {
      let actionsToTrigger: string[] = [];

      if (timer === "five-minutes") {
        actionsToTrigger = process.env.FIVE_MINUTES_ACTIONS.split(',');
      } else if (timer === "one-day") {
        actionsToTrigger = process.env.ONE_DAY_ACTIONS.split(',');
      } else {
        actionsToTrigger = []
      }
      const result = await this.webhoooksService.getWebhook(actionsToTrigger);
      return result;
    } catch (error) {
      return [error.status, error.message];
    }
  }
}