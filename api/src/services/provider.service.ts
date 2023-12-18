import { Injectable } from '@nestjs/common';
import supabase from '../config/supabase.config';

@Injectable()
export class ProviderService {
    async createProvider(name: string, description: string, url: string): Promise<[number, string]> {
        try {
            let response = await supabase.from('provider').insert([
                { name: name, description: description, login_url: url }
            ]).select();
            if (response.error) {
                throw response.error;
            }

            return [201, 'success, Provider created'];
        } catch (error) {
            return [error.status, error.message];
        }
    }
}