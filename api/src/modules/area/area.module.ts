import { Module } from '@nestjs/common';
import { ActionsModule } from './actions.module';
import { ReactionsModule } from './reactions.module';
import { AreaController } from '../../controllers/area/area.controller';
import { AreaService } from '../../services/area/area.service';

@Module({
  imports: [ActionsModule, ReactionsModule],
  controllers: [AreaController],
  providers: [AreaService],
})

export class AreaModule {}