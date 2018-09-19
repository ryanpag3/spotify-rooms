import Router from 'express';
import * as spotifyController from '../controllers/spotify';

const router = Router();

router.route('/callback')
    .get(spotifyController.callback);

export default router;