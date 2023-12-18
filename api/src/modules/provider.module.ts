import { Module } from '@nestjs/common';
import { ProviderController } from '../controllers/provider.controller';
import { ProviderService } from '../services/provider.service';

@Module({
    imports: [],
    controllers: [ProviderController],
    providers: [ProviderService],
  })
export class ProviderModule {}