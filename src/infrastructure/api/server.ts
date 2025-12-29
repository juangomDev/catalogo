import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { userRouter } from './routes/user.router';
import { UserController } from './controllers/user.controller';
import { UserPostgresRepository } from '../persistence/repositories/user_repository';
import { CreateUserHandler } from '../../application/user/create_user.handler';

export class ApiServer {
    private app: express.Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {

        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:", "https:"]
                }
            }
        }));


        this.app.use(cors({
            //   origin: config.api.cors.origins,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));



        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // Límite por IP
            message: 'Too many requests from this IP, please try again later.'
        });
        this.app.use('/api/', limiter);


        // Body parsing
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Compression
        // this.app.use(compression());

        // Logging
        // this.app.use(requestLogger);
    }

    private setupRoutes(): void {
        
        this.app.get('/health', (_req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                memory: process.memoryUsage()
            });
        });

        // API routes
        const repository = new UserPostgresRepository()
        const userhandler = new CreateUserHandler(repository)
        const controller = new UserController(userhandler);
        const router = new userRouter( controller ) 
        this.app.use('/api/v1', router.router());

        // Docs
        this.app.use('/api-docs', express.static('docs'));
    }


    public async start(): Promise<void> {
        return new Promise((resolve) => {
            this.app.listen(this.port, () => {
                console.log(`🚀 Server running on port ${this.port}`);
                console.log(`📚 API Docs: http://localhost:${this.port}/api-docs`);
                console.log(`🏥 Health: http://localhost:${this.port}/health`);
                resolve();
            });
        });
    }


    public getApp(): express.Application {
        return this.app;
    }
}