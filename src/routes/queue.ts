import Router from 'express';
import * as queueController from '../controllers/queue';

const router = Router();

router.route('/add')
    .post(queueController.addSong);

export default router