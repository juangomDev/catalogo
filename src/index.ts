import { MediatorConfig } from "./application/mediator.config";
import { UserController } from "./infrastructure/api/controllers/user.controller";
import { userRouter } from "./infrastructure/api/routes/user.router";
import { ApiServer } from "./infrastructure/api/server";

async function start(): Promise<void> {
  try {
    console.info('🚀 Starting application...');

    // 1. Inicializar base de datos
    // await initializeDatabase();
    
    MediatorConfig.configure();
    const userController = new UserController();
    const UserRouter = new userRouter(userController);

    const apiServer = new ApiServer( 3000, UserRouter.router() );
    await apiServer.start();

    console.info('✅ Application started successfully');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

start();