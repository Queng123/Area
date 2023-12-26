import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
const axios = require('axios');

@Injectable()
export class AreaService {
  async generateArea(action: string, reaction: string): Promise<[number, string]> {
    try {
      const user = await supabase.auth.getUser();
      if (user.error) {
        return [401, 'error, User not logged in'];
      }
      const userProviders = await supabase.from('user_provider').select('provider_id').eq('user_id', user.data.user.email);
      if (userProviders.error) {
        throw userProviders.error;
      }
      if (userProviders.data.length === 0) {
        return [401, 'error, User not connected to any provider'];
      }
      const area = await supabase.from('area').select('*').eq('user_id', user.data.user.email);
      if (area.error) {
        throw area.error;
      }
      for (let i = 0; i < area.data.length; i++) {
        if (area.data[i].action_id === action && area.data[i].reaction_id === reaction) {
          return [409, 'error, Area already exists'];
        }
      }
      const actionProvider = await supabase.from('action').select('provider_id').eq('name', action);
      const reactionProvider = await supabase.from('reaction').select('provider_id').eq('name', reaction);

      const actionProviderPresent = userProviders.data.some(provider => provider.provider_id === actionProvider.data[0].provider_id);
      const reactionProviderPresent = userProviders.data.some(provider => provider.provider_id === reactionProvider.data[0].provider_id);

      if (!actionProviderPresent || (!reactionProviderPresent && reaction !== 'email')) {
        return [401, 'error, User not connected to the required providers'];
      }
      const actionUrl = await supabase.from('action').select('creation_url').eq('name', action);
      const reactionUrl = await supabase.from('reaction').select('callback_url').eq('name', reaction);

      const res = await fetch(actionUrl.data[0].creation_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ webhookEndpoint: reactionUrl.data[0].callback_url }),
      });
      let loadAction = await res.json();
      if (loadAction.error) {
        throw loadAction.error;
      }
      let response = await supabase.from('area').insert([
          { action_id: action, reaction_id: reaction, user_id: user.data.user.email }
      ]).select();

      if (response.error) {
          throw response.error;
      }
      return [201, 'success, Area created'];
    } catch (error) {
        return [error.status, error.message];
    }
  }
}