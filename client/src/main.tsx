import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from "./routes/Root.tsx";
import App from './App.tsx'
import LandingPage from './routes/LandingPage.tsx';
import { Friends } from './routes/Friends.tsx';
import {Auth0Provider} from "@auth0/auth0-react"; 
import { AuthenticationGuard } from './components/AuthenticationGuard.tsx';

const router = createBrowserRouter([
  { // All routes for logged in users should be children of this route
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path:"friends", 
        element: <AuthenticationGuard component={Friends}/>
      }
    ],
  },
  { // Landing page for non-logged in users
    path: "/welcome",
    element: <LandingPage />,
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <>
  <Auth0Provider
    useRefreshTokens
    cacheLocation='localstorage'
    domain='dev-1hayc3662ummsupb.us.auth0.com'
    clientId='C8KUX8xnplvjaekDTmTGhin7a0UYoOyl'
    authorizationParams={{
      redirect_uri: `${window.location.origin}/friends`
    }}

    >

 

    <RouterProvider router={router} />
    </Auth0Provider>
  </>
  
)
