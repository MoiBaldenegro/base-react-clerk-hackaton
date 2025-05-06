import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Landing from './Routes/Landing';
import {
      FluentProvider,
      webDarkTheme,
} from "@fluentui/react-components";
import { Home } from './Routes/Home';
import {  CreateOrganizationComponent } from './components/organizations/createOrganization/createOrganization';
import { CREATE_ORGANIZATION_PATH, DASHBOARD_PATH, HOME_PATH, LANDING_PATH } from './helpers/paths';
import { Dashboard } from './components/dashboard/Dashboard';
function App() {

  const router = createBrowserRouter([
  { path: LANDING_PATH, element: <Landing /> },
  { path: HOME_PATH, element: <Home /> ,
     children: [
    {
      path: DASHBOARD_PATH,
      element: <Dashboard />,
    },
    {
      path: CREATE_ORGANIZATION_PATH,
      element: <CreateOrganizationComponent />,
    }
  ]},
  ]);

  return (
    <>
      <FluentProvider theme={webDarkTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </>
  )
}   

export default App
