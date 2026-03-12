import { Request, Response, NextFunction } from 'express';
import { CreateUserCommand } from '../../../application/user/command/user_command';
import { CreateUserHandler } from '../../../application/user/create_user.handler';

export class UserController {
    constructor(
        private readonly CreateUserHandler: CreateUserHandler,
    ){}

    public async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const { name, email, description } = req.body;

            const command = new CreateUserCommand(name, email, description);

            await this.CreateUserHandler.execute(command);

            res.status(201).json({ message: 'User created successfully'})

        } catch (error) {
            next(error)
        }
    }

}