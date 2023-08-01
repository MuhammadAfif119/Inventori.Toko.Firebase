import React from "react";
import { Outlet } from "react-router-dom";
import AppBarDasboard from "../component/Sidebar";

const AdminLayout = () => {
  return (
    <>
      <div className="">
        <div className="container">
          <div className="row">
            <AppBarDasboard />
            <main className="col-9-md ms-sm-auto col-lg-10 px-md-4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
