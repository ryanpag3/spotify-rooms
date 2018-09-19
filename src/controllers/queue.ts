import {Request, Response} from 'express';

export let addSong = (req: Request, res: Response) => {
    console.log(req.body);
    res.send('Fuck off');
}