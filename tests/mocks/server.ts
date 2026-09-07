import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW server for Node.js tests (Vitest)
 * This intercepts HTTP requests during unit and integration tests
 */
export const server = setupServer(...handlers);
