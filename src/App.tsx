import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Landing from './Routes/Landing';
import {
      FluentProvider,
      webDarkTheme,
} from "@fluentui/react-components";
import { Home } from './Routes/Home';
import { CreateOrganization } from './Routes/createOrganization';
function App() {

  const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: "/home", element: <Home /> },
        {
      path: "/create-organization",
              element: <CreateOrganization />
              
        }]);

  return (
    <>
      <FluentProvider theme={webDarkTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </>
  )
}   

export default App
