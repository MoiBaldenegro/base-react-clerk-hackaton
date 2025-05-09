import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Landing from './Routes/Landing';
import {
      FluentProvider,
      webDarkTheme,
} from "@fluentui/react-components";
import { Home } from './Routes/Home';
import {  CreateOrganizationComponent } from './components/organizations/createOrganization/createOrganization';
import { CODE_EDITOR_PATH, COLABORATIVE_ROOM_PATH, CREATE_ORGANIZATION_PATH, DASHBOARD_PATH, HOME_PATH, LANDING_PATH, WORKSPACE_PATH } from './helpers/paths';
import { Dashboard } from './components/dashboard/Dashboard';
import { Workspace } from './components/worspace/workspace';
import { PersonalEditor } from './components/personal-editor/personalEditor';
import CreateRoom from './components/colaborative-room/colaborativeRoom';
import CollaborativeEditor from './components/examples/colaborativeEditor.example';

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
    },
    // {
    //   path: WORKSPACE_PATH,
    //   element: <Workspace />,
    // },
    {
      path: CODE_EDITOR_PATH,
      element: <PersonalEditor />,
    },
    {
      path: COLABORATIVE_ROOM_PATH,
      element: <CreateRoom/>,
    },
    {
      path:`${COLABORATIVE_ROOM_PATH}/room/:roomId`,
      element: <CollaborativeEditor  />,
    }
  ]},
  ]);

  const customTheme = {
    ...webDarkTheme,
    colorNeutralBackground1: "#000",
  }


  return (
    <>
      <FluentProvider theme={customTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </>
  )
}   

export default App
