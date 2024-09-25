import React, { } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import LSystemPage from './pages/LSystemPage';

// Define the structure of the router using React Router's type definitions
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LSystemPage />} />
    </>
  )
);

const App: React.FC = () => {

  return (
    <RouterProvider router={router} />
  );
};

export default App;
