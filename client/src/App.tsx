import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
