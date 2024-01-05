import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { GithubStrategy } from '../strategies/github.strategy';
import { MSTeams } from 'src/strategies/MSTeams.strategy';
import { SpotifyStrategy } from 'src/strategies/spotify.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, MSTeams, SpotifyStrategy],
})

export class AuthModule {}