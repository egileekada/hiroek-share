import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import SharePage from "./page/share"

function App() {

  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/">
        <Route index element={
          <div className=" w-full h-screen flex justify-center items-center " >
          </div>
        } />
        <Route path="event/:id" element={<SharePage />} /> 
      </Route>
    )
  );
  return (
    <div className=" w-full "  style={{ fontFamily: "Axiforma-Medium" }} >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
