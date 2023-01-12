import { IRequest, Router, RouterType } from 'itty-router';
import { Env } from '../index';

export default class HealthController {
    private router: RouterType;

    public constructor(parentBaseUrl: string) {
        const baseUrl = `${parentBaseUrl}/health`;
        this.router = Router({ base: baseUrl });
        this.setupRoutes();
    }

    public getRouter = (): RouterType => {
        return this.router;
    };

    private setupRoutes = () => {
        this.router.get('/', this.getHealth);
    };

    private getHealth = (request: IRequest, env: Env, ctx: ExecutionContext): Response => {
        return new Response('Healthy!');
    };
}
