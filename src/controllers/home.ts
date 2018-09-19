import path from 'path';
import {Request, Response} from 'express';

export let index = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../views/home.html'));
}

