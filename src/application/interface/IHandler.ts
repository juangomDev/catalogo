import { ICommand } from "./ICommand";
import { IQuery } from "./IQuery";

export interface ICommandHandler<TCommand extends ICommand, TResult = any> {
    handler(command: TCommand): Promise<TResult>;
}

export interface IQueryHandler<TQuery extends IQuery, TResult = any> {
    handler(query: TQuery): Promise<TResult>;
}