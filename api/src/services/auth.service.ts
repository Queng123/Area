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
        token: req.user.accessToken,
        refreshToken: req.user.refreshToken
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

  async DeezerLogin(req): Promise<[number, string]> {
  const user = await supabase.auth.getUser();
  if (user.error) {
      return [401, 'error, User not logged in'];
  }
  const service = await supabase.from('user_provider')
      .select('user_id, provider_id')
      .eq('user_id', user.data.user.email)
      .eq('provider_id', 'Deezer');
  if (service.data.length !== 0) {
      return [409, 'error, User already connected with Deezer'];
  }
  if (!req.user) {
      return [401, 'error, User not logged in'];
  }
   const { data, error } = await supabase.from('user_provider')
      .insert([
        {
          user_id: user.data.user.email,
          provider_id: 'Deezer',
          token: req.user
        }
      ]);
    if (error) {
        console.log(error);
        return [500, 'error, something went wrong'];
    }
    return [200, 'success, user connected with Deezer'];
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

  async discordLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
        return [401, 'error, User not logged in'];
    }

    const service = await supabase.from('user_provider')
        .select('user_id, provider_id')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', 'Discord');
    if (service.data.length !== 0) {
        return [409, 'error, User already connected with Discord'];
    }
    if (!req.user) {
        return [401, 'error, User not logged in'];
    }
    const { data, error } = await supabase.from('user_provider')
        .insert([
            {
                user_id: user.data.user.email,
                provider_id: 'Discord',
                token: req.user
            }
        ]);
    if (error) {
        console.log(error);
        return [500, 'error, something went wrong'];
    }
    return [200, 'success, user connected with Discord'];
  }
}