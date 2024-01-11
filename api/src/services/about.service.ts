import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

type ServiceAction = {
  name: string;
  description: string;
};

type ServiceReaction = {
  name: string;
  description: string;
};

type Service = {
  name: string;
  actions: ServiceAction[];
  reactions: ServiceReaction[];
};

type About = {
  client: any;
  server: {
      current_time: number;
      services: Service[];
  };
};

@Injectable()
export class AboutService {
  async getAbout(): Promise<[number, About]> {
    let about: About = {} as About;
    const provider = await supabase
      .from('provider')
      .select('name');
    about.client = process.env.IP_ADDRESS;
    console.log(provider.data);
    about.server = {
      current_time: Date.now(),
      services: [],
    };
    for (let i = 0; i < provider.data.length; i++) {
      const actions = await supabase
        .from('action')
        .select('name, description')
        .eq('provider_id', provider.data[i].name);
      const reactions = await supabase
        .from('reaction')
        .select('name, description')
        .eq('provider_id', provider.data[i].name);
      about.server.services.push({
        name: provider.data[i].name,
        actions: [],
        reactions: [],
      });
      for (let j = 0; j < actions.data.length; j++) {
        about.server.services[i].actions.push({
          name: actions.data[j].name,
          description: actions.data[j].description,
        });
      }
      for (let j = 0; j < reactions.data.length; j++) {
        about.server.services[i].reactions.push({
          name: reactions.data[j].name,
          description: reactions.data[j].description,
        });
      }
    }
    return [200, about];
  }
}