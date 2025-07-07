import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./routes/home";
import About from "./routes/about";
import Container from "./components/ui/container";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);

function App() {
  return (
    <main className="w-screen h-screen flex justify-center">
      <Container>
        <RouterProvider router={router} />
      </Container>
    </main>
  )
}

export default App;
