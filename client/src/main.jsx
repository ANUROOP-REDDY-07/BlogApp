import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./components/common/Home.jsx";
import Signin from "./components/common/Signin.jsx";
import Signup from "./components/common/Signup.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import AuthorProfile from "./components/author/AuthorProfile.jsx";
import Articles from "./components/common/Articles.jsx";
import ArticleById from "./components/common/ArticleById.jsx";
import PostArticle from "./components/author/PostArticle.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserAuthorProvider } from "./contexts/userAuthorContext.jsx";

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "user-profile/:email",
            element: <UserProfile />,
            children: [
              {
                path: "articles",
                element: <Articles />,
              },
              {
                path: ":articleid",
                element: <ArticleById />,
              },
              {
                path: "",
                element: <Navigate to="articles" />,
              },
            ],
          },
          {
            path: "author-profile/:email",
            element: <AuthorProfile />,
            children: [
              {
                path: "articles",
                element: <Articles />,
              },
              {
                path: ":articleid",
                element: <ArticleById />,
              },
              {
                path: "article",
                element: <PostArticle />,
              },
              {
                path: "",
                element: <Navigate to="articles" />,
              },
            ],
          },
        ]
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <UserAuthorProvider>
      <RouterProvider router={browserRouterObj} />
    </UserAuthorProvider>
  </StrictMode>
);
