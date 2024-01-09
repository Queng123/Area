import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { GithubStrategy } from '../strategies/github.strategy';
import { Deezer } from 'src/strategies/deezer.strategy';
import { SpotifyStrategy } from 'src/strategies/spotify.strategy';
import { DiscordStrategy } from 'src/strategies/discord.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, Deezer, SpotifyStrategy, DiscordStrategy],
})

export class AuthModule {}