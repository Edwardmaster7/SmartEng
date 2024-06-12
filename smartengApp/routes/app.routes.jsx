import { Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Quote from "../src/pages/Quote";
import Client from "../src/pages/Client";
import Stages from "../src/pages/Stages";
import BDI from "../src/pages/BDI";
import Bases from "../src/pages/Bases";
import Profile from "../src/pages/Profile";
import NotFound from "../src/pages/404";

export function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orcamento" element={<Quote />} />
        <Route path="/cliente" element={<Client />} />
        <Route path="/etapas" element={<Stages />} />
        <Route path="/bdi" element={<BDI />} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}