import { ApiServer } from "./infrastructure/api/server";

async function start(): Promise<void> {
  try {
    console.info('🚀 Starting application...');

    // 1. Inicializar base de datos
    // await initializeDatabase();
    
    const apiServer = new ApiServer( 3000 );
    await apiServer.start();

    console.info('✅ Application started successfully');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

start();