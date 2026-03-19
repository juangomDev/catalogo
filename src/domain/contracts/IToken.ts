
export type Payload = {
    id: string
}

export interface ITokenService {
    generate(payload: Payload): string;
    verify(token: string): Payload
}