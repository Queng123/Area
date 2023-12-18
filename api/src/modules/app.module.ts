import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

import { ProviderModule } from './provider.module';

@Module({
  imports: [UserModule, ProviderModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
