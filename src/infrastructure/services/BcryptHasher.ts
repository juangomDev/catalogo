import { IBcryptHasher } from "../../../domain/contracts/IHasher";

// This is a mock implementation for demonstration purposes.
// In a real application, you would use a library like bcrypt.
export class BcryptHasher implements IBcryptHasher {
    async hash(plain: string): Promise<string> {
        return `hashed_${plain}`;
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        return `hashed_${plain}` === hash;
    }
}
