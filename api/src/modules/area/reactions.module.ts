import { Module } from '@nestjs/common';
import { ReactionsController } from '../../controllers/area/reactions.controller';
import { ReactionsService } from 'src/services/area/reactions.service';
@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService],
})

export class ReactionsModule {}