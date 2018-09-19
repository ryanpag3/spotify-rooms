import env from '../utils/env';
import { Response } from 'express';
import url from 'url';
import privateConfig from '../../config-private.json';

const pConfig = privateConfig[env];

export default class Spotify {
    readonly CLIENT_ID: string = pConfig.spotify.client_id;
    readonly CLIENT_SECRET: string = pConfig.spotify.client_secret;
    readonly REDIRECT_URI: string = pConfig.spotify.redirect_uri;
    refreshToken: string;

    constructor(refreshToken: string = undefined) {
        this.refreshToken = refreshToken;
    }

    authorize(res: Response) {
        const options = {
            pathname: 'https://accounts.spotify.com/authorize',
            query: {
                response_type: 'code',
                client_id: this.CLIENT_ID,
                client_secret: this.CLIENT_SECRET,
                redirect_uri: this.REDIRECT_URI
            }
        }
        res.redirect(url.format(options));
    }

    callback() {
        
    }
}