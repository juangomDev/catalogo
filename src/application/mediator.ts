import { ICommand } from "./interface/ICommand";
import { IQuery } from "./interface/IQuery";
import { ICommandHandler, IQueryHandler } from "./interface/IHandler";

class Mediator {
    private commandHandlers = new Map<string, ICommandHandler<any, any>>()
    private queryHandlers = new Map<string, IQueryHandler<any, any>>()

    subscribeCommand<TCommand extends ICommand, TResult>(commandType: string, handler: ICommandHandler<TCommand, TResult>): void {
        this.commandHandlers.set(commandType, handler);
    }

    async sendCommand<TCommand extends ICommand, TResult = any>(command: TCommand): Promise<TResult> {
        const handler = this.commandHandlers.get(command.type);

        if (!handler) {
            throw new Error(`Command handler not found for ${command.type}`);
        }

        return await handler.execute(command);
    }

    subscribeQuery<TQuery extends IQuery, TResult>(queryType: string, handler: IQueryHandler<TQuery, TResult>): void {
        this.queryHandlers.set(queryType, handler);
    }

    async sendQuery<TQuery extends IQuery, TResult = any>(query: TQuery): Promise<TResult> {
        const handler = this.queryHandlers.get(query.type);

        if (!handler) {
            throw new Error(`Query handler not found for ${query.type}`);
        }

        return await handler.execute(query);
    }
}

export const mediator = new Mediator()