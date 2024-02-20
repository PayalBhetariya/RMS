import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
function Base() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Base;
