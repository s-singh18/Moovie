import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { Feed, Upload, User } from "./components";
import {
  HashRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/user/:id",
    element: <User />,
  },
]);

// const router = createHashRouter(
//   createRoutesFromElements(
//     <>
//       <Route exact path="/" element={<Feed />} />
//       <Route exact path="/upload" element={<Upload />} />
//       <Route exact path="/user/:id" element={<User />} />
//     </>
//   )
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
