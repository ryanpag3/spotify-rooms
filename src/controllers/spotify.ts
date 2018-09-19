import {Request, Response} from 'express';
import rp from 'request-promise';
import env from '../utils/env';
import privateConfig from '../../config-private.json';

const pConfig = privateConfig[env];

export let callback = (req: Request, res: Response) => {
    console.log(req.query.code);
    console.log(pConfig.spotify.redirect_uri);

    const base64 = 'Basic ' + Buffer.from(pConfig.spotify.client_id + ':' + pConfig.spotify.client_secret).toString('base64');

    const options = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': base64
        },
        uri: 'https://accounts.spotify.com/api/token',
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: pConfig.spotify.redirect_uri
        })
    }
    rp.post(options)
        .then((postResult) => {
            console.log(postResult); 
            res.sendStatus(200)
        });
}