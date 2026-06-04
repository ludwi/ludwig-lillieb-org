import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styling/index.scss';

const container = document.getElementById('root');
if (container) {
  const tree = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (container.children.length > 0) {
    hydrateRoot(container, tree);
  } else {
    createRoot(container).render(tree);
  }
}
