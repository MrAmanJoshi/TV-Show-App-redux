import React from "react";
import { Route, Routes } from "react-router-dom";
import ShowDetailPage from "./Pages/ShowDetails.Page";
import ShowListPage from "./Pages/ShowsList.Page";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<ShowListPage />} />
        <Route path="show/:show_id" element={<ShowDetailPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;