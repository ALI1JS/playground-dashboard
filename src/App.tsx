import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./route";
import { OwnersProvider } from "./context/ownersContext";



const Router = createBrowserRouter(routers)

function App() {

  return (
    <>
      <OwnersProvider>

        <RouterProvider router={Router} />
      </OwnersProvider>
    </>
  )
}

export default App
