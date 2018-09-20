import env from '../utils/env';
import {
    Response
} from 'express';
import url from 'url';
import rp from 'request-promise';
import privateConfig from '../../config-private.json';

const pConfig = privateConfig[env];

export default class Spotify {
    /* static final */
    readonly CLIENT_ID: string = pConfig.spotify.client_id;
    readonly CLIENT_SECRET: string = pConfig.spotify.client_secret;
    readonly REDIRECT_URI: string = pConfig.spotify.redirect_uri;

    /* spotify URIs */
    readonly AUTHORIZE_URI: string = 'https://accounts.spotify.com/authorize';
    readonly CALLBACK_URI: string = 'https://accounts.spotify.com/api/token';
    readonly GETUSER_URI: string = 'https://api.spotify.com/v1/me';

    /* non-static */
    accessToken: string;
    refreshToken: string;

    constructor(refreshToken: string = undefined, accessToken: string = undefined) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }

    authorize = (res: Response) => {
        const options = {
            pathname: this.AUTHORIZE_URI,
            query: {
                response_type: 'code',
                client_id: this.CLIENT_ID,
                client_secret: this.CLIENT_SECRET,
                redirect_uri: this.REDIRECT_URI
            }
        }
        res.redirect(url.format(options));
    }

    getClientAuth = () => {
        return {
            'Authorization': 'Basic ' + Buffer.from(pConfig.spotify.client_id + ':' + pConfig.spotify.client_secret).toString('base64')
        }
    }

    getBearerAuth = () => {
        return {
            'Authorization': 'Bearer ' + this.accessToken
        }
    }

    setTokens = (tokenResponse) => {
        console.log(tokenResponse);
        this.accessToken = tokenResponse.access_token;
        this.refreshToken = tokenResponse.refresh_token;
        return;
        // return new Promise((resolve, reject) => resolve);
    }

    /**
     * handle callback token request
     * @param authCode - authorization code
     * @returns access/refresh tokens, token type, token expiry, application scope
     */
    callback = (authCode: string) => {
        const options = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...this.getClientAuth()
            },
            uri: this.CALLBACK_URI,
            form: {
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: pConfig.spotify.redirect_uri
            },
            json: true
        }
        return rp.post(options)
            .then((result) => {
                console.log(result);
                return result;
            });
    }

    /**
     * 
     */
    getUser = () => {
        const options = {
            uri: this.GETUSER_URI,
            headers: {
                ...this.getBearerAuth()
            }
        }
        return rp.get(options);
    }
}