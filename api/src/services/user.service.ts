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
}
