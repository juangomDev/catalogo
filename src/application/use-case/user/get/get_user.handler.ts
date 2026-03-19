
import { GetUserByIdService } from "../../../../domain/services/user/get.service";
import { IQueryHandler } from "../../../interface/IHandler";
import { UserMapper, UserResponseDto } from "../../../mapper/user.mapper";
import { GetUserQuery } from "./query/get_user.query";

export class GetUserHandler implements IQueryHandler<GetUserQuery, UserResponseDto> {

    constructor(private readonly getUserService: GetUserByIdService) {}

    public async handler(query: GetUserQuery): Promise<UserResponseDto> {
        const user = await this.getUserService.execute(query.id);
        
        return UserMapper.toDto(user);
    }
}
