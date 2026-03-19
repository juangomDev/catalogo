import { User } from "../../domain/entity/user.entity";
import { CreateUserCommand } from "../use-case/user/create/command/user_command";

export class UserResponseDto {
    id!: string;
    name!: string;
    description!: string;
}

export class UserMapper {

    public static toDomain(dto: CreateUserCommand): Partial<User> {
        return {
            name: dto.name,
            description: dto.description
        };
    }

    public static toDto(entity: User): UserResponseDto {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
        };
    }

    public static toDtoList(entities: User[]): UserResponseDto[] {
        return entities.map(entity => this.toDto(entity));
    }
}
