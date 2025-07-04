import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello router!</div>,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
