import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./Routes";
import AppLayout from "../Layout/Layout";

const LayoutRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => {
          if (path.indexOf("cheff") > 0) {
            return (
              <Fragment key={i}>
                <Route key={i}>
                  <Route path={path} element={Component} />
                </Route>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={i}>
                <Route element={<AppLayout />} key={i}>
                  <Route path={path} element={Component} />
                </Route>
              </Fragment>
            );
          }
        })}
      </Routes>
    </>
  );
};

export default LayoutRoutes;
