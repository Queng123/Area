import { Module } from '@nestjs/common';
import { ActionsController } from '../../controllers/area/actions.controller';
import { ActionsService } from '../../services/area/actions.service';
@Module({
  controllers: [ActionsController],
  providers: [ActionsService],
})

export class ActionsModule {}