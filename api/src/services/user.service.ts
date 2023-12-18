import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class UserService {
  async createUserWithEmail(body: any): Promise<[number, string]> {
    const { email, password, username } = body;

    try {
      const session = await supabase
        .from('profile')
        .select('email')
        .eq('email', email);

      if (session.data.length > 0) {
        return [409, 'error, User already exist'];
      }

      let signUpOptions = {
        email: email,
        password: password,
      }
      let response = await supabase.auth.signUp(signUpOptions);
      if (response.error) {
        throw response.error;
      }
      await supabase.from('profile').insert([
        { name: (username) ? username : '', email: email },
      ]).select();

      return [201, 'success, User created'];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async loginUserWithEmail(body: any): Promise<[number, string]> {
    const { email, password } = body;
    try {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        return [409, 'error, User already logged in'];
      }
      const response = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (response.error) {
        throw response.error;
      }
      return [200, 'success, User logged in'];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async loginUserWithGoogle(body: any): Promise<[number, string]> {
    try {
      let response = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (response.error) {
        throw response.error;
      }

      return [200, 'success: ' + response.data.url];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async logoutUser(): Promise<[number, string]> {
    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        return [409, 'error, User not logged in'];
      }
      const response = await supabase.auth.signOut();
      if (response.error) {
        throw response.error;
      }

      return [200, 'success, User logged out'];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async resetPassword(email: string): Promise<[number, string]> {
    try {
      let response = await supabase.auth.resetPasswordForEmail(email,
        {
          redirectTo: process.env.APP_URL + '/',
        }
      );
      if (response.error) {
        throw response.error;
      }

      return [200, 'success, Password reset email sent'];
    } catch (error) {
      return [error.status, error.message];
    }
  };

  async updatePassword(body: any): Promise<[number, string]> {
    const { password } = body;
    try {
      let response = await supabase.auth.updateUser({ password: password });
      if (response.error) {
        throw response.error;
      }
      return [200, 'success, Password updated'];
    } catch (error) {
      return [error.status, error.message];
    }
  }
}
