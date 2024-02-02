import React from "react";
import PublicRoutes from "./pageroutes/publicroutes";
import PrivateRoutes from "./pageroutes/privateoutes";

const App = () => {
  return <>{false ? <PublicRoutes /> : <PrivateRoutes />}</>;
};

export default App;
