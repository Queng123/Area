import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + 'auth/discord/callback',
      scope: ['identify', 'guilds'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return accessToken;
  }
}
