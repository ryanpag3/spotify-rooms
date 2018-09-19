import Router from 'express';
import * as slackController from '../controllers/slack';

const router = Router();

router.route('/action')
    .post(slackController.handleAction);

export default router;