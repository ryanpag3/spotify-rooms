import {Request, Response} from 'express';
import env from '../utils/env';
import privateConfig from '../../config-private.json';
import Spotify from '../services/spotify';

const pConfig = privateConfig[env];

export let callback = (req: Request, res: Response) => {
    let spotify = new Spotify();
    return spotify.callback(req.query.code)
        .then(spotify.setTokens)
        .then(spotify.getUser)
        .then(result => res.send(result));
}

/**
 * pause a user's playback
 */
export let pause = (req: Request, res: Response) => {
    let spotify = new Spotify();
    spotify.reauthorize(privateConfig[env].spotify.refresh_token)
        .then(() => spotify.pause())
        .then((result) => {
            console.log(result);
        });
}
