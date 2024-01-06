import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
const axios = require('axios');
import { google } from 'googleapis';

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
      return [201, 'success, action created'];
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
      const user = body.user;

      const userDatas = await supabase.from('profile')
        .select('datas')
        .eq('email', user);

      if (userDatas.error) {
        throw userDatas.error;
      }

      const credentials = await supabase.from('user_provider')
        .select('token')
        .eq('user_id', user)
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
              url: body.webhookEndpoint + '?email=' + user + '&action=star',
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

  async unstarAction(body: any): Promise<[number, string]> {
    try {
      const user = body.user;

      const userDatas = await supabase.from('profile')
        .select('datas')
        .eq('email', user);

      if (userDatas.error) {
        throw userDatas.error;
      }

      const credentials = await supabase.from('user_provider')
        .select('token')
        .eq('user_id', user)
        .eq('provider_id', 'Github');

      if (credentials.error) {
        throw credentials.error;
      }

      const action = await supabase.from('action')
        .select('creation_url')
        .eq('name', 'star')
        .eq('provider_id', 'Github');

      if (action.error) {
        throw action.error;
      }

      const reaction = await supabase.from('reaction')
        .select('callback_url')
        .eq('name', 'email');

      if (reaction.error) {
        throw reaction.error;
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
        const response = await axios.get(
          `https://api.github.com/repos/${owner.data.login}/${repo.name}/hooks`,
          {
            headers: {
              Authorization: `token ${accessToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].config.url === reaction.data[0].callback_url + '?email=' + user + '&action=star') {
            let webhookId = response.data[i].id;
            await axios.delete(
              `https://api.github.com/repos/${owner.data.login}/${repo.name}/hooks/${webhookId}`,
              {
                headers: {
                  Authorization: `token ${accessToken}`,
                  Accept: 'application/vnd.github.v3+json',
                },
              }
            );
            console.log(`Webhook deleted for ${owner.data.login}/${repo.name}:`, webhookId);
          }
        }
      });
      await Promise.all(webhookPromises);

      return [200, 'success, Webhooks deleted for all repositories'];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async deleteAction(actionName: string): Promise<[number, string]> {
    try {
      const response = await supabase.from('action').delete().match({ name: actionName });

      if (response.error) {
          throw response.error;
      }
      return [200, 'success, Action deleted'];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async receivedEmail(body: any): Promise<[number, string]> {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        body.webhookEndpoint
      );

      const user = body.user;


      const userDatas = await supabase.from('profile')
        .select('datas')
        .eq('email', user);

      if (userDatas.error) {
        throw userDatas.error;
      }

      let datas = {
        lastEmail: null,
      }
      if (userDatas.data[0].datas !== null && userDatas.data[0].datas.lastEmail !== null) {
        datas.lastEmail = userDatas.data[0].datas.lastEmail;
      }

      const credentials = await supabase.from('user_provider')
        .select('token')
        .eq('user_id', user)
        .eq('provider_id', 'Google');

      if (credentials.error) {
        throw credentials.error;
      }

      const accessToken = credentials.data[0].token;
      oauth2Client.setCredentials({ access_token: accessToken });

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      const response = await gmail.users.messages.list({
        userId: 'me',
        q: 'is:unread in:inbox',
      });
      const messages = response.data.messages;
      if (messages === undefined) {
        return [200, 'success, no new email received'];
      }
      const messageId = messages[0].id;
      const message = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
      });
      const timestamp = message.data.payload.headers.find((header) => header.name === 'Date').value;
      if (datas.lastEmail !== null && datas.lastEmail === timestamp) {
        return [200, 'success, no new email received'];
      }
      const url = body.webhookEndpoint + '?email=' + user + '&action=email';
      const res = await axios.post(url, {
        subject: "New email",
        html: `<p>Hi, you have a new email.</p>`,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 201) {
        const error = {
          response: {
            status: res.status,
            data: {
              statusText: res.statusText,
            },
          },
        };
        throw error;
      }
      await supabase.from('profile').update({ datas: {
        lastEmail: timestamp,
      } }).eq('email', user);
      return [200, 'success, email received'];
    } catch (error) {
      return [error.response.status, error.response.statusText];
    }
  }

  async getMeteo(body: any): Promise<[number, string]> {
    try {
      const user = body.user;

      const userDatas = await supabase.from('profile')
        .select('datas')
        .eq('email', user);

      if (userDatas.error) {
        throw userDatas.error;
      }

      const credentials = await supabase.from('user_provider')
        .select('token')
        .eq('user_id', user)
        .eq('provider_id', 'OpenWeatherMap');

      if (credentials.error) {
        throw credentials.error;
      }

      const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=' + process.env.METEO_API_KEY + '&q=Nantes');

      if (response.status !== 200) {
        const error = {
          response: {
            status: response.status,
            data: {
              statusText: response.statusText,
            },
          },
        };
        throw error;
      }
      if (response.data.current.temp_c > 10) {
        return [200, 'success, meteo superior to 10'];
      }
      const url = body.webhookEndpoint + '?email=' + user + '&action=meteo';
      const res = await axios.post(url, {
        subject: 'Meteo warning',
        html: `<p>Hi, the meteo is under 10°c in Nantes.</p>`,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 201) {
        const error = {
          response: {
            status: res.status,
            data: {
              statusText: res.statusText,
            },
          },
        };
        throw error;
      }
      return [200, 'success, meteo under 10'];
    } catch (error) {
      return [error.response.status, error.response.statusText];
    }
  }
}
