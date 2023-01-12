import { Router, RouterType } from 'itty-router';
import HealthController from './HealthController';

export default class MainController {
    private rootRouter: RouterType;
    private apiRouter: RouterType;

    private healthController: HealthController;

    private BASE_URL = '/api/v1';

    constructor() {
        // setup a root router for middleware and all valid 404 for all requests
        // then use the api router for actual api requests
        this.rootRouter = Router();
        this.apiRouter = Router({ base: this.BASE_URL });
        // set up controllers and connect them to routes
        this.healthController = new HealthController(this.BASE_URL);
        this.setupRoutes();
    }

    public getRouter = (): RouterType => {
        return this.rootRouter;
    };

    private setupRoutes = () => {
        // send all requests to the api router, then 404 if the api router doesn't handle them
        this.rootRouter.all('*', this.apiRouter.handle);
        this.apiRouter.all('/health/*', this.healthController.getRouter().handle);
        this.rootRouter.all('*', () => new Response('Not found.', { status: 404 }));
    };
}
