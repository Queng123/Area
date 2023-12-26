import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
const axios = require('axios');

@Injectable()
export class ActionsService {
  async createAction(name: string, description: string, url: string, provider: string ): Promise<[number, string]> {
    try {
      let response = await supabase.from('action').insert([
          { name: name, description: description, creation_url: url, provider_id: provider}
      ]).select();

      if (response.error) {
          throw response.error;
      }
      return [201, 'success, Provider created'];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async getActions(): Promise<any> {
    try {
      const response = await supabase.from('action').select('*');

      if (response.error) {
          throw response.error;
      }
      return [200, response.data];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async starAction(body: any): Promise<[number, string]> {
    try {
      const user = await supabase.auth.getUser();

      if (user.error) {
        return [401, 'error, User not logged in'];
      }

      const credentials = await supabase.from('user_provider')
        .select('token')
        .eq('user_id', user.data.user.email)
        .eq('provider_id', 'Github');

      if (credentials.error) {
        throw credentials.error;
      }

      const accessToken = credentials.data[0].token;
      const owner = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      const repositories = await axios.get(`https://api.github.com/users/${owner.data.login}/repos`, {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const webhookPromises = repositories.data.map(async (repo) => {
        const response = await axios.post(
          `https://api.github.com/repos/${owner.data.login}/${repo.name}/hooks`,
          {
            name: 'web',
            active: true,
            events: ['star'],
            config: {
              url: body.webhookEndpoint + '?email=' + user.data.user.email + '&action=star',
            },
          },
          {
            headers: {
              Authorization: `token ${accessToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        console.log(`Webhook created for ${owner.data.login}/${repo.name}:`, response.data);
      });
      await Promise.all(webhookPromises);

      return [200, 'success, Webhooks created for all repositories'];
    } catch (error) {
        return [error.status, error.message];
    }
  }
}
