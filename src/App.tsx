import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { routers } from "./route";




const Router = createBrowserRouter(routers)

function App() {

  return (
    <>
       <RouterProvider router={Router}/>
    </>
  )
}

export default App
