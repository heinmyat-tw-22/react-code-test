import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/app.scss";
import Mui_Theme from "./assets/mui-theme";
import Layout from "./components/layout/layout/Layout";
import { addPosts } from "./context/PostSlice";
import { ThemeContext } from "./context/themeContext";
import { useAppDispatch } from "./hooks/useAppSelector";
import Home from "./pages/home/Home";
import SinglePost from "./pages/single-post/SinglePost";
import { axiosInstance } from "./utils/axiosInstance";

const App = () => {
  const { themeMode } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await axiosInstance.get(`posts`);

      dispatchRef.current(addPosts(res.data));
    };

    fetchAllPosts();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/popular",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Home />,
        },
        {
          path: "/archives",
          element: <Home />,
        },
        {
          path: "/user",
          element: <Home />,
        },
        {
          path: "/post/:id",
          element: <SinglePost />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={Mui_Theme(themeMode)}>
      <div className={`app-wrapper theme-${themeMode ? "dark" : "light"}`}>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
