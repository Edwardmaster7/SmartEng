import { Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Quotes from "../src/pages/Quotes";
import Clients from "../src/pages/Clients";
import Stages from "../src/pages/Stages";
import BDI from "../src/pages/BDI";
import Bases from "../src/pages/Bases";
import Profile from "../src/pages/Profile";
import NotFound from "../src/pages/404";
import ClientDetails from "../src/pages/ClientDetails";
import Buildings from "../src/pages/Buildings";
import BuildingDetails from "../src/pages/BuildingDetails";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orcamentos" element={<Quotes />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/clientes/details/:id" element={<ClientDetails />} />
      <Route path="/obras" element={<Buildings />} />
      <Route path="/obras/details/:id" element={<BuildingDetails />} />
      <Route path="/etapas" element={<Stages />} />
      <Route path="/bdi" element={<BDI />} />
      <Route path="/bases" element={<Bases />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
