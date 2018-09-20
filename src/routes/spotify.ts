import Router from 'express';
import * as spotifyController from '../controllers/spotify';

const router = Router();

router.route('/callback')
    .get(spotifyController.callback);

router.route('/pause')
    .post(spotifyController.pause);

export default router;