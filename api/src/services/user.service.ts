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
      const user = await supabase.auth.getUser();
      if (user.data.user != null) {
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
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
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

  async deleteUser(): Promise<[number, string]> {
    try {
      const user = await supabase.auth.getUser();
      if (user.data.user == null) {
        return [409, 'error, User not logged in'];
      }
      const response = await supabase.auth.admin.deleteUser(user.data.user.id);
      if (response.error) {
        throw response.error;
      }
      const response2 = await supabase.from('profile').delete().eq('email', user.data.user.email);
      if (response2.error) {
        throw response2.error;
      }
      return [200, 'success, User account deleted'];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async getUserName(): Promise<[number, string]> {
    try {
      const user = await supabase.auth.getUser();
      if (user.error) {
        throw user.error;
      }
      const name = user.data.user.email.split('@')[0]
      const { data, error } = await supabase
        .from('profile')
        .select('name')
        .eq('email', user.data.user.email);
      if (error) {
        return [200, name];
      }
      return [200, data[0].name];
    } catch (error) {
      return [error.status, error.message];
    }
  }

  async getUserService(): Promise<[number, string]> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      return [409, 'error, User not logged in'];
    }
    const UserService = await supabase.from('user_provider').select('provider_id').eq('user_id', user.data.user.email);
    var services = await supabase.from("provider").select("*");
    var servicesList = [];

    for (let i = 0; i < services.data.length; i++) {
      var dictionnary = {
        'name': services.data[i].name,
        'isConnected': false
      };
      if (UserService.data != null) {
        for (let j = 0; j < UserService.data.length; j++) {
          console.log(UserService.data[j].provider_id, services.data[i].name);
          if (services.data[i].name == UserService.data[j].provider_id) {
            dictionnary.isConnected = true;
          }
        }
      }
      servicesList.push(dictionnary);
    }

    return [200, JSON.stringify(servicesList)];
  }

  async deleteUserProvider(body: any): Promise<[number, string]> {
    const provider = body.service;
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        return [409, 'error, User not logged in'];
      }
      const credentials = await supabase.from('user_provider')
        .select('*')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', provider);
      if (credentials.error) {
        throw credentials.error;
      }
      if (credentials.data.length === 0) {
        return [409, 'error, User not connected to this provider'];
      }
      const response = await supabase.from('user_provider')
        .delete()
        .eq('user_id', user.data.user.email)
        .eq('provider_id', provider);
      if (response.error) {
        throw response.error;
      }
      return [200, 'success, User provider deleted'];
    } catch (error) {
      return [error.status, error.message];
    }
  }
}
