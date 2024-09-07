import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/error";
import DebatePage from "../pages/debate";
import HomePage from "../pages/home";
import { Root, DebateRoot } from "./router";
import "./styles/index.css";
import RoomPage from "../pages/room";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Room",
        element: <RoomPage />,
      },
    ],
  },
  {
    element: <DebateRoot />,
    children: [
      {
        path: "/debate/:debateRoomId",
        element: <DebatePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
