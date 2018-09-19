import path from 'path';
import {Request, Response} from 'express';
import Spotify from '../services/spotify';

const spotify = new Spotify();

export let index = (req: Request, res: Response) => {
    spotify.authorize(res);
}

