/**
 * @fileoverview Entry point for the Architecture AI React application.
 * Bootstraps the React DOM and mounts the root App component into the HTML DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * The HTML element designated as the mounting point for the React application.
 * @type {HTMLElement | null}
 */
/**
 * Locates the root HTML element and mounts the React instance.
 * Ensures the application is mounted securely within the DOM.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

/**
 * The React Root instance managing the rendered application tree.
 * Responsible for concurrent mode rendering and managing the top-level
 * ErrorBoundary and StrictMode wrappers to ensure architectural resilience.
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
