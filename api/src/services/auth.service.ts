import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class AuthService {
  async googleLogin(req): Promise<[number, string]> {
    const user = await supabase.auth.getUser();

    if (user.error) {
      return [409, 'error, User not logged in'];
    }
    const service = await supabase.from('user_provider')
                            .select('user_id, provider_id')
                            .eq('user_id', user.data.user.email)
                            .eq('provider_id', 'Google');
    if (service.data !== null) {
      return [409, 'error, User already connected with google'];
    }
    if (!req.user) {
      return [409, 'error, no user found'];
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
    if (service.data !== null) {
        return [409, 'error, User already connected with github'];
    }
    if (!req.user) {
        return [409, 'error, no user found'];
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
}