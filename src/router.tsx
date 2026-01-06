import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import ExploreMode from './pages/ExploreMode';
import Dashboard from './pages/Dashboard';
import Glossary from './pages/Glossary';
import Risks from './pages/Risks';
import Fees from './pages/Fees';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ExploreMode />,
      },
      {
        path: 'glossary',
        element: <Glossary />,
      },
      {
        path: 'risks',
        element: <Risks />,
      },
      {
        path: 'fees',
        element: <Fees />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
