import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class AdminService {
  async deleteUser(id: string): Promise<[number, string]> {
    try {
      const user = await supabase.auth.admin.getUserById(id)
      if (user.error) {
        return [409, 'error, User not found'];
      }
      const response2 = await supabase.from('profile').delete().eq('email', user.data.user.email);
      if (response2.error) {
        throw response2.error;
      }
      const response = await supabase.auth.admin.deleteUser(id);
      if (response.error) {
        throw response.error;
      }
      return [200, 'success, User account deleted'];
    } catch (error) {
      return [error.status, error.message];
    }
  }
}