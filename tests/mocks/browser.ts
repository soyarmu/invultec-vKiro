import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW browser worker for browser-based testing (optional)
 * Can be used for development mocking in the browser
 * 
 * To enable in development:
 * 1. Run: npx msw init public/ --save
 * 2. Import and start this worker in your app
 */
export const worker = setupWorker(...handlers);
