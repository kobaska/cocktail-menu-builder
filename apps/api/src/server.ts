import express from 'express';
import { Express } from "express-serve-static-core";
import { setupRoutes } from './routes';
import cors from './middleware/cors';
import { errorHandler } from './middleware/error-handler';

export class ApiServer {
  public static run({
    port = 3000
  }: {
    port: number,
  }): Express {
    const app = express();
    app.use(express.json());

    // Enable CORS
    cors(app);

    // Set up a router
    setupRoutes(app);
    
    // Add error handler
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`[ ready ] server is running on port ${port}`);
    })

    return app;
  }
}