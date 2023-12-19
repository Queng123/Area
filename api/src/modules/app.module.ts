import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { ProviderModule } from './provider.module';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    UserModule,
    ProviderModule,
    AuthModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
