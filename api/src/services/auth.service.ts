import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class AuthService {
  async googleLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
      return [401, 'error, User not logged in'];
    }
    const service = await supabase.from('user_provider')
                            .select('user_id, provider_id')
                            .eq('user_id', user.data.user.email)
                            .eq('provider_id', 'Google');
    if (service.data.length !== 0) {
      return [409, 'error, User already connected with google'];
    }
    if (!req.user) {
      return [401, 'error, User not logged in'];
    }

    const { data, error } = await supabase.from('user_provider').insert([
      {
        user_id: user.data.user.email,
        provider_id: 'Google',
        token: req.user.accessToken
      },
    ]).select();
    if (error) {
      return [500, 'error, something went wrong'];
    }
    return [200, 'success, User logged in with google'];
  }

  async githubLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
        return [401, 'error, User not logged in'];
    }
    const service = await supabase.from('user_provider')
        .select('user_id, provider_id')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', 'Github');
    if (service.data.length !== 0) {
        return [409, 'error, User already connected with github'];
    }
    if (!req.user) {
        return [401, 'error, User not logged in'];
    }
    const { data, error } = await supabase.from('user_provider')
        .insert([
            {
                user_id: user.data.user.email,
                provider_id: 'Github',
                token: req.user
            }
        ]);
    if (error) {
        return [500, 'error, something went wrong'];
    }
    return [200, 'success, user connected with github'];
  }

  async MSTeamsLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
        return [401, 'error, User not logged in'];
    }

    const service = await supabase.from('user_provider')
        .select('user_id, provider_id')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', 'MSTeams');
    if (service.data.length !== 0) {
        return [409, 'error, User already connected with MSTeams'];
    }

    if (!req.user) {
        return [401, 'error, User not logged in'];
    }

    const { data, error } = await supabase.from('user_provider')
      .insert([
        {
          user_id: user.data.user.email,
          provider_id: 'MSTeams',
          token: req.user
        }
      ]);
    if (error) {
        console.log(error);
        return [500, 'error, something went wrong'];
    }
    return [200, 'success, user connected with MSTeams'];
  }

  async spotifyLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
        return [401, 'error, User not logged in'];
    }

    const service = await supabase.from('user_provider')
        .select('user_id, provider_id')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', 'Spotify');
    if (service.data.length !== 0) {
        return [409, 'error, User already connected with Spotify'];
    }
    if (!req.user) {
        return [401, 'error, User not logged in'];
    }
    const { data, error } = await supabase.from('user_provider')
        .insert([
            {
                user_id: user.data.user.email,
                provider_id: 'Spotify',
                token: req.user
            }
        ]);
    if (error) {
        console.log(error);
        return [500, 'error, something went wrong'];
    }
    return [200, 'success, user connected with Spotify'];
  }
}