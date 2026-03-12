import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class userRouter {
    private readonly _router: Router;

    constructor(
        private controller: UserController 
    ) {
        this._router = Router();
        this.setRouter()
    }

    public setRouter(): void {
        this._router.post('/register', (req, res, next) => this.controller.Create(req, res, next));
        // login 
        
    }

    public router(): Router {
        return this._router;
    }
} 