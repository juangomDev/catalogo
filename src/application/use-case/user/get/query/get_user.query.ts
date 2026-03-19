import { IQuery } from "../../../../interface/IQuery";

export class GetUserQuery implements IQuery {
    readonly type = "GET_USER";
    constructor(
        public readonly id: string
    ) {}
}
