import { Request, Response, NextFunction } from 'express';
import { mediator } from '../../../application/mediator';
import { CreateUserCommand } from '../../../application/use-case/user/create/command/user_command';

export class UserController {
    constructor(){}

    public async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const { name, email, description } = req.body;

            const command = new CreateUserCommand(name, email, description);

            await mediator.sendCommand(command);

            res.status(201).json({ message: 'User created successfully'})

        } catch (error) {
            next(error)
        }
    }

}