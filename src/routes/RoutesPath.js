import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Accueil from "../pages/Accueil/Accueil";
import Scan from "../pages/Scan/Scan";
import Recherche from "../pages/Recherche/Recherche";
import NotFound from "../pages/NotFound/NotFound";

function RoutesPath() {
  return (
    <HashRouter basename="/">
      <Layout>
        <Routes>
          <Route path={["/", "/Kpiecee"]} element={<Accueil />} />
          <Route path="/scans/:scan" element={<Scan />} />
          <Route path="/recherche/:searchTerm" element={<Recherche />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default RoutesPath;
