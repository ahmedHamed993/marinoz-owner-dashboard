import { RouterProvider } from "react-router";
import Providers from "./components/providers/Providers";
import { router } from "./router/router";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
