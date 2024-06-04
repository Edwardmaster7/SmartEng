import { Routes, Route } from "react-router-dom";

import Header from "../src/components/Header";

import Home from "../src/pages/Home";
import Quote from "../src/pages/Quote";
import Client from "../src/pages/Client";
import Stages from "../src/pages/Stages";
import BDI from "../src/pages/BDI";
import Bases from "../src/pages/Bases";

export function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orcamento" element={<Quote />} />
        <Route path="/cliente" element={<Client />} />
        <Route path="/etapas" element={<Stages />} />
        <Route path="/bdi" element={<BDI />} />
        <Route path="/bases" element={<Bases />} />
      </Routes>
    );
}