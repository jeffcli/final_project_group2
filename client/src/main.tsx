import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/Root.tsx";
import App from './App.tsx'
import LandingPage from './routes/LandingPage.tsx';

const router = createBrowserRouter([
  { // All routes for logged in users should be children of this route
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
  { // Landing page for non-logged in users
    path: "/welcome",
    element: <LandingPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
