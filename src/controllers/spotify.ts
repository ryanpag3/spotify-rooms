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
