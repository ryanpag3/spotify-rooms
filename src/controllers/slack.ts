import {Request, Response} from 'express';

export let handleAction = (req: Request, res: Response) => {
    console.log(req.body);
}