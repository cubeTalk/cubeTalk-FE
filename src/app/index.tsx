import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DebatePage from "../pages/debate";
import HomePage from "../pages/home";
import { Root, DebateRoot } from "./router";
import "./styles/index.css";
import RoomPage from "../pages/room";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AlertDialog from "../entities/alertDialog";
import { enableMocking } from "./mocks/browser";
import { DebateErrorPage, HomeErrorPage } from "../pages/error";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <HomeErrorPage />,
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
        errorElement: <DebateErrorPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AlertDialog>
          <RouterProvider router={router} />
        </AlertDialog>
      </QueryClientProvider>
    </StrictMode>
  );
})

