import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/error";
import ChatPage from "../pages/chat";
import HomePage from "../pages/home";
import { Root, ChatRoot } from "./router";
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
    element: <ChatRoot />,
    children: [
      {
        path: "/chat/:chatRoomId",
        element: <ChatPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
