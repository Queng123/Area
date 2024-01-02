import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
import resend from '../../config/resend.config';

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
      return [201, 'success, Provider created'];
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

  async sendMail(email: string, action: string): Promise<[number, string]> {
    try {
      let subject: string;
      let html: string;
      if (action === 'star') {
        subject = 'New star on Github';
        html = `<p>Hi, you have a new star on Github on your repository.</p>`;
      } else {
        subject = 'Not implemented yet';
        html = `<p>Hi, this action is not implemented yet.</p>`;
      }
      const res = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: subject,
        html: html
      });
      if (res.error) {
        throw res.error;
      }

      return [201, 'success, email sent'];
    } catch (error) {
        return [error.status, error.message];
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