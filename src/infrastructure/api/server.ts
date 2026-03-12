import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

export class ApiServer {
    private app: express.Application;
    private port: number;
    private readonly router: express.Router

    constructor(port: number, router: express.Router) {
        this.app = express();
        this.port = port;
        this.router = router;
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

        this.app.use('/api/v1', this.router);

        // Docs
        this.app.use('/api-docs', express.static('docs'));

        // Error handling middleware
        this.app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
            // console.error(err);
            res.status(500).json( err );
        });
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