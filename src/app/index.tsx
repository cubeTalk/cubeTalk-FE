import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/error";
import DebatePage from "../pages/debate";
import HomePage from "../pages/home";
import { Root, DebateRoot } from "./router";
import "./styles/index.css";
import RoomPage from "../pages/room";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
