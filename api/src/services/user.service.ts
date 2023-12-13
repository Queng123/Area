import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class UserService {
  async createUserWithEmail(body: any): Promise<[number, string]> {
    const { email, password, username } = body;
    try {
      let signUpOptions = {
        email: email,
        password: password,
        options: {
          data: {
            username: '',
          }
        },
      }
      if (username) {
        signUpOptions.options.data.username = username;
      }
      let response = await supabase.auth.signUp(signUpOptions);
      if (response.error) {
        throw response.error;
      }

      return [201, 'success, User created'];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async loginUserWithEmail(body: any): Promise<[number, string]> {
    const { email, password } = body;
    try {
      let response = await supabase.auth.signInWithPassword({
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

  async logoutUser(): Promise<[number, string]> {
    try {
      let response = await supabase.auth.signOut();
      if (response.error) {
        throw response.error;
      }

      return [200, 'success, User logged out'];
    } catch (error) {
      return [error.status, error.message];
    }
  }
}
