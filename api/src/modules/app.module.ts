import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { ProviderModule } from './provider.module';

@Module({
  imports: [UserModule, ProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
