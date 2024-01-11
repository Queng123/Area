import { Injectable } from '@nestjs/common';
import supabase from '../../config/supabase.config';
import axios from 'axios';
import { GitHubProfileStatus } from 'github-profile-status';

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
      const user = await supabase.auth.getUser();

      if (user.error) {
        return [401, 'error, User not logged in'];
      }

      const providers = await supabase.from('user_provider')
        .select('provider_id')
        .eq('user_id', user.data.user.email);

      const reactions = await supabase.from('reaction')
        .select('name, description, callback_url')
        .in('provider_id', providers.data.map((provider) => provider.provider_id));

      return [200, reactions.data];
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
      const mailjet = require('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
      const res = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "quentin.brejoin@gmail.com",
                "Name": "AREA"
              },
              "To": [
                {
                  "Email": email,
                  "Name": email.split('@')[0]
                }
              ],
              "Subject": email,
              "HTMLPart": html
            }
          ]
        });
      return [201, 'success, email sent'];
    } catch (error) {
      console.log("error", error)
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
        contextUri: lastMusic.data.items[0].track.album.uri,
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

  async startDeezer(email: string, action: string, body: any): Promise<[number, string]> {
    const access_token = await supabase.from('user_provider').select('token').eq('user_id', email).eq('provider_id', 'Deezer');
    if (access_token.data.length === 0) {
      return [401, 'error, User not logged in'];
    }
    const response = await axios.get('https://api.deezer.com/editorial/0/charts', {
      params: {
        access_token: access_token.data[0].token,
      },
    });
    // Extract a random track from the response
    const randomTrack = response.data.tracks.data[Math.floor(Math.random() * response.data.tracks.data.length)];
    try {
      const subject = "One of the top track of the day";
      const html = `<p>Hi, here is the top track of the day.</p>
      <p>Artist: ${randomTrack.artist.name}
      Track: ${randomTrack.title}
      Album: ${randomTrack.album.title}
      We think you will like it !
      Give it a try ! https://www.deezer.com/track/${randomTrack.id}</p>
      <img src="${randomTrack.album.cover_big}">
      <footer>Deezer x AREA</footer>`;

      const mailjet = require('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
      const res = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "quentin.brejoin@gmail.com",
                "Name": "Area"
              },
              "To": [
                {
                  "Email": email,
                  "Name": email.split('@')[0]
                }
              ],
              "Subject": subject,
              "HTMLPart": html,
            }
          ]
        });
      return [201, 'reaction succeed'];
    } catch (error) {
      console.log("error", error)
      return error;
    }
  }

  async getSpotifyRecommendations(email: string, action: string, body: any): Promise<[number, string]> {
    const rawToken = await supabase.from('user_provider').select('token').eq('user_id', email).eq('provider_id', 'Spotify');
    if (rawToken.data.length === 0) {
      return [401, 'error, User not logged in'];
    }
    console.log("rawToken", rawToken.data[0].token)
    try {
      const access_token = rawToken.data[0].token;
      const response = await axios.get('https://api.spotify.com/v1/recommendations', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        params: {
          limit: 5,
          seed_genres: 'hip-hop, rap, rock',
        }
      });

      const subject = "Your recommendations";
      let html = `<p>Hi, here are your recommendations.</p>`;
      response.data.tracks.forEach((track: any) => {
        html += `<p>Artist: ${track.artists[0].name}
        Track: ${track.name}
        Album: ${track.album.name}
        Give it a try ! https://open.spotify.com/track/${track.id}</p>
        <img src="${track.album.images[0].url}">`;
      });
      html += `<footer>Spotify x AREA - Triggered by: ${action}</footer>`;
      const mailjet = require('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
      const res = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "quentin.brejoin@gmail.com",
                "Name": "Area"
              },
              "To": [
                {
                  "Email": email,
                  "Name": email.split('@')[0]
                }
              ],
              "Subject": subject,
              "HTMLPart": html,
            }
          ]
        });
      return [201, 'reaction succeed'];
    } catch (error) {
      console.log("error", error)
      return error;
    }
  }

  async changeStatus(email: string, action: string, body: any): Promise<[number, string]> {
    try {
      const accessToken = await supabase.from('user_provider').select('token').eq('user_id', email).eq('provider_id', 'Github');
      const githubProfileStatus = new GitHubProfileStatus({
        token: accessToken.data[0].token,
      });

      await githubProfileStatus.clear();
      await githubProfileStatus.set({
        emoji: ':anger:',
        message: 'I may be slow to respond.',
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
        limitedAvailability: true
      });
      return [201, 'success, status changed'];
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