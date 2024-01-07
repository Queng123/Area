import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
import resend from '../../config/resend.config';
import { Console } from 'console';
import axios from 'axios';

@Injectable()
export class ReactionsService {
  async createReaction(name: string, description: string, url: string, provider: string): Promise<[number, string]> {
    try {
      let response = await supabase.from('reaction').insert([
          { name: name, description: description, callback_url: url, provider_id: provider}
      ]).select();

      if (response.error) {
          throw response.error;
      }
      return [201, 'success, reaction created'];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async getReactions(): Promise<any> {
    try {
      const response = await supabase.from('reaction').select('*');

      if (response.error) {
          throw response.error;
      }
      return [200, response.data];
    } catch (error) {
        return [error.status, error.message];
    }
  }

  async sendMail(email: string, action: string, body: any): Promise<[number, string]> {
    try {
      let subject: string;
      let html: string;
      if (action === 'star') {
        subject = 'New star on Github';
        html = `<p>Hi, you have a new star on Github on your repository.</p>`;
      } else {
        subject = body.subject || 'Not implemented yet';
        html = body.html || `<p>Hi, this action is not implemented yet.</p>`;
      }
      const res = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: subject,
        html: html
      });
      if (res.error) {
        throw [500, res.error.message]
      }

      return [201, 'success, email sent'];
    } catch (error) {
        return error;
    }
  }

  async startSpotify(email: string, action: string, body: any): Promise<[number, string]> {
    try {
      const token = await supabase.from('user_provider').select('token').eq('user_id', email).eq('provider_id', 'Spotify');
      const lastMusic = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          'Authorization': `Bearer ${token.data[0].token}`
        }
      });
      const playMusic = await axios.put('https://api.spotify.com/v1/me/player/play', {
        contextUri: lastMusic.data.items[0].context.uri,
        uris: [lastMusic.data.items[0].track.uri],
        offset: {
          position: 0
        },
        position_ms: 0
      }, {
        headers: {
          'Authorization': `Bearer ${token.data[0].token}`,
          'Content-Type': 'application/json',
        }
      });
      if (playMusic.data.error) {
        throw [500, playMusic.data.error.message]
      }
      return [201, 'success, music played'];
    } catch (error) {
      console.log("error", error)
      return error;
    }
  }

  async deleteReaction(reactionName: string): Promise<[number, string]> {
    try {
      const response = await supabase.from('reaction').delete().match({ name: reactionName });

      if (response.error) {
          throw response.error;
      }
      return [200, 'success, reaction deleted'];
    } catch (error) {
        return [error.status, error.message];
    }
  }
}