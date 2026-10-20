import '@testing-library/jest-dom';
import * as React from 'react';

(globalThis as any).React = React;

// MSW server setup will be imported when needed
// For now, we'll set it up in individual test files that need it
