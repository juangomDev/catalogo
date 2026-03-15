import { Credentials } from "../../../domain/entity/credentials.entity";
import { ICredentialsRepository } from "../../../domain/repository/credentials.repository";

// This is a mock implementation for demonstration purposes.
// In a real application, this would interact with a database.
export class CredentialsPostgresRepository implements ICredentialsRepository {
    private credentials: Credentials[] = [];

    async save(credentials: Credentials): Promise<void> {
        this.credentials.push(credentials);
        console.log('Saved credentials for user:', credentials.Email);
    }

    async findById(id: string): Promise<Credentials | null> {
        return this.credentials.find(c => c.Id === id) || null;
    }

    async findByEmail(email: string): Promise<Credentials | null> {
        return this.credentials.find(c => c.Email === email) || null;
    }

    async updateEmail(id: string, newEmail: string): Promise<void> {
        const credentials = await this.findById(id);
        if (credentials) {
            // In a real app you would update the Email VO
            console.log(`Email updated for ${id}`);
        }
    }

    async updateHash(id: string, newHash: string): Promise<void> {
        const credentials = await this.findById(id);
        if (credentials) {
            credentials.updateHash(newHash);
            console.log(`Hash updated for ${id}`);
        }
    }
}
