import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffe from "./components/AddCoffe.jsx";
import UpdateCoffe from "./components/UpdateCoffe.jsx";
import Home from "./components/Home.jsx";
import CoffeSingle from "./components/CoffeSingle.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AuthProvider from "./Auth/AuthProvider.jsx";
import Users from "./components/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/coffes/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/coffes/${params.id}`),
    element: <CoffeSingle />,
  },
  {
    path: "/addcoffe",
    element: <AddCoffe />,
  },
  {
    path: "updatecoffe/:id",
    element: <UpdateCoffe />,
    loader: ({ params }) => fetch(`http://localhost:3000/coffes/${params.id}`),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/users",
    element: <Users />,
    loader: () => fetch("http://localhost:3000/users/"),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
