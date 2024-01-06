import { Module } from '@nestjs/common';
import { WebhookController } from '../../controllers/area/webhook.controller';
import { WebhookService } from '../../services/area/webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
})

export class WebhookModule {}