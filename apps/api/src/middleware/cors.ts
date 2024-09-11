import cors from 'cors';
import * as core from 'express-serve-static-core';

/**
 * Enable CORS
 */
export default (app: core.Express): void => {
  const allowedOrigins = [];

  if (process.env['CORS_DOMAINS_TO_ALLOW']) {
    const corsDomainsToAdd = process.env['CORS_DOMAINS_TO_ALLOW'].split(',');

    allowedOrigins.push(...corsDomainsToAdd);
  }

  app.use(cors({
    origin: (origin: string, callback: (_: null, allow: boolean) => void) => {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  }));
}