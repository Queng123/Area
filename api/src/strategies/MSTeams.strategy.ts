import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-azure-ad-oauth2';

@Injectable()
export class MSTeams extends PassportStrategy(Strategy, 'MSTeams') {
  constructor() {
    super({
      clientID: process.env.MSTEAMS_CLIENT_ID,
      clientSecret: process.env.MSTEAMS_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + 'auth/teams/callback',
      scope: ['User.Read'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return accessToken;
  }
}
