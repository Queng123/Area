import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { WebhookService } from '../../services/area/webhook.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

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
  async getWebhook(@Res() res: Response, @Param('timer') timer: string): Promise<Response> {
    try {
      let actionsToTrigger: string[] = [];

      if (timer === "five-minutes") {
        actionsToTrigger = process.env.FIVE_MINUTES_ACTIONS.split(',');
      } else if (timer === "one-day") {
        actionsToTrigger = process.env.ONE_DAY_ACTIONS.split(',');
      } else {
        actionsToTrigger = []
      }
      const [statusCode, message] = await this.webhoooksService.getWebhook(actionsToTrigger);
      return res.status(statusCode).json({ message: message });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}