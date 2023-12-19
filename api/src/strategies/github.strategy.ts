import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.APP_URL + 'auth/github/callback',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    return accessToken;
  }
}