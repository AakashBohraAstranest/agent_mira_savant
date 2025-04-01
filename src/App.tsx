import { RouterProvider } from "react-router"
import { Router } from "./routes/Router"
import '../public/css/clash-display.css'
import '../public/css/geologica.css'
import { ToastContainer } from "react-toastify"

function App() {

  return (
  <>
  <ToastContainer position="bottom-left" autoClose={3000} closeOnClick pauseOnHover={true} theme="colored"/>
    <RouterProvider router={Router} />
  </>
  )
}

export default App
