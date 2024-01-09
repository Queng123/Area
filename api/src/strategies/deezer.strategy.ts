import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-deezer';

@Injectable()
export class Deezer extends PassportStrategy(Strategy, 'deezer') {
  constructor() {
    super({
      clientID: process.env.DEEZER_CLIENT_ID,
      clientSecret: process.env.DEEZER_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + 'auth/deezer/callback',
      scope: ['email', 'offline_access', 'manage_library', 'manage_community', 'delete_library', 'listening_history', 'basic_access'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return accessToken;
  }
}
