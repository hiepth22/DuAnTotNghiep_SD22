import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "../../routes/routes";

function AllRoute() {
  const elements = useRoutes(routes);
  return <>{elements}</>;
}

export default AllRoute;
