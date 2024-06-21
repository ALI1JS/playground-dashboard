import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./route";
import { OwnersProvider } from "./context/ownersContext";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./context/adminContext";
import { PlayersProvider } from "./context/playersContext";


const Router = createBrowserRouter(routers)

function App() {

  return (
    <>
     <AdminProvider>
     <OwnersProvider>
     <PlayersProvider>
        <Toaster/>
        <RouterProvider router={Router} />
        </PlayersProvider>
      </OwnersProvider>
     </AdminProvider>
     
    </>
  )
}

export default App
