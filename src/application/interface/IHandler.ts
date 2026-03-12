import { ICommand } from "./ICommand";
import { IQuery } from "./IQuery";

export interface ICommandHandler<TCommand extends ICommand, TResult = any> {
    execute(command: TCommand): Promise<TResult>;
}

export interface IQueryHandler<TQuery extends IQuery, TResult = any> {
    execute(query: TQuery): Promise<TResult>;
}