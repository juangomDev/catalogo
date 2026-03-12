import { ICommand } from "./command/root.command";

interface ICommandHandler<TCommand extends ICommand, TResult = any> {
    execute(command: TCommand): Promise<TResult>;
}

class Mediator {
    private handlers = new Map<string, ICommandHandler<any, any>>()

    subscribe<TCommand extends ICommand, TResult>(commandType: string, handler: ICommandHandler<TCommand, TResult>): void {
        this.handlers.set(commandType, handler);
    }

    async send<TCommand extends ICommand, TResult = any>(command: TCommand): Promise<TResult> {
        const handler = this.handlers.get(command.type);

        if (!handler) {
            throw new Error(`not fount ${command.type}`);
        }

        return await handler.execute(command);
    }
}

export const mediator = new Mediator()