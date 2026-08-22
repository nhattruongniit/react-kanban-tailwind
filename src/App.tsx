import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Board } from "./pages/board";
import { Dashboard } from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/board",
    element: <Board />
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;