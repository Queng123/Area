import { Module } from '@nestjs/common';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.service';
import { AboutController } from '../controllers/about.controller';
import { AboutService } from '../services/about.service';
@Module({
  controllers: [AdminController, AboutController],
  providers: [AdminService, AboutService],
})

export class AdminModule {}