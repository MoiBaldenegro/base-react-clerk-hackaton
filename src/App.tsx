import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Landing from './Routes/Landing';
import {
      FluentProvider,
      webDarkTheme,
} from "@fluentui/react-components";
function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Landing /> },]);

  return (
    <>
      <FluentProvider theme={webDarkTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </>
  )
}   

export default App
