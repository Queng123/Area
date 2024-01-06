import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
import axios from 'axios';

@Injectable()
export class WebhookService {
  async getWebhook(actionsToTrigger: string[]): Promise<[number, string]> {
    try {
      const actions = await supabase.from('area').select('user_id, action_id, reaction_id');

      for (let i = 0; i < actions.data.length; i++) {
        if (actionsToTrigger.includes(actions.data[i].action_id)) {
          let action = await supabase.from('action').select('creation_url').eq('name', actions.data[i].action_id);
          let reaction = await supabase.from('reaction').select('callback_url').eq('name', actions.data[i].reaction_id);
          console.log(`triggering ${actions.data[i].action_id} with ${actions.data[i].reaction_id} for ${actions.data[i].user_id}`)
          const response = await axios.post(action.data[0].creation_url, {
            webhookEndpoint: reaction.data[0].callback_url,
            user: actions.data[i].user_id
          },{
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      }
      return [200, 'success, webhook getted'];
    } catch (error) {
      return [error.response.status, error.response.statusText];
    }
  }
}