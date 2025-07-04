import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

function App() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <RouterProvider router={router} />
    </main>
  )
}

export default App;
