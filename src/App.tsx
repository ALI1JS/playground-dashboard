import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routers } from "./route";
import { OwnersProvider } from "./context/ownersContext";
import { Toaster } from "react-hot-toast";
import { AdminProvider } from "./context/adminContext";


const Router = createBrowserRouter(routers)

function App() {

  return (
    <>
     <AdminProvider>
     <OwnersProvider>
        <Toaster/>
        <RouterProvider router={Router} />
      </OwnersProvider>
     </AdminProvider>
     
    </>
  )
}

export default App
