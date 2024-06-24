import profileImageSrc from "../assets/perfil.jpeg";0
import Modal from "./Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../assets/Mediamodifier-Design-Template-3.png";

import { api } from "../services/api";
import { useAuth } from "../hooks/auth";

const Header = () => {
  const { user } = useAuth();

  const aClassName = "cursor-pointer px-2 text-base text-indigo-50 hover:text-white";
  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarURL);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const handleToggleUserModal = () => {
    if (isUserModalOpen) {
      setIsUserModalOpen(false)
    } else {
      setIsUserModalOpen(true)
    }
  }

  const { signOut } = useAuth()

  return (
    <>
      <button
        onClick={handleToggleUserModal}
        className="fixed top-3 ml-4 z-30"
      >
        <img
          className={`size-10 rounded-2xl outline-offset-2 ${isUserModalOpen ? "outline outline-violet-300 delay-75" : ""}`}
          src={avatar}
          alt="Profile Image"
        />
      </button>
      <header className="bg-indigo-800 sticky top-0 z-10 p-4 flex items-center justify-between h-16 shadow-md">
        <div id="" className="size-10 rounded-2xl"></div>

        <nav className="items-center gap-3">
          <Link
            id="home-tab"
            to="/"
            className={`${aClassName} ${
              location.pathname === "/" ? "font-bold" : "hover:font-medium"
            }`}
          >
            Home
          </Link>
          <Link
            id="clients-tab"
            to="/clientes"
            className={`${aClassName} ${
              location.pathname === "/clientes"
                ? "font-bold"
                : "hover:font-medium"
            }`}
          >
            Clientes
          </Link>
          <Link
            id="quote-tab"
            to="/orcamento"
            className={`${aClassName} ${
              location.pathname === "/orcamento"
                ? "font-bold"
                : "hover:font-medium"
            }`}
          >
            Orçamento
          </Link>
          <Link
            id="stages-tab"
            to="/etapas"
            className={`${aClassName} ${
              location.pathname === "/etapas"
                ? "font-bold"
                : "hover:font-medium"
            }`}
          >
            Etapas
          </Link>
          <Link
            id="bdi-tab"
            to="/bdi"
            className={`${aClassName} ${
              location.pathname === "/bdi" ? "font-bold" : "hover:font-medium"
            }`}
          >
            BDI
          </Link>
          <Link
            id="bases-tab"
            to="/bases"
            className={`${aClassName} ${
              location.pathname === "/bases" ? "font-bold" : "hover:font-medium"
            }`}
          >
            Bases
          </Link>
        </nav>

        <div id="" className="size-10 rounded-2xl"></div>

        {/* <Button content="" imgSrc={menuImage}></Button> */}

        {/* <div id="mobile-nav" className="absolute flex flex-col gap-3 right-2 top-24 z-10">
              <button id="home-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/">Home</Link></button>
              <button id="client-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/cliente">Cliente</Link></button>
              <button id="budget-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/orcamento">Orçamento</Link></button>
              <button id="stages-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/etapas">Etapas</Link></button>
              <button id="bdi-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/bdi">BDI</Link></button>
              <button id="bases-button" onClick={route} className="px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150"><Link to="/bases">Bases</Link></button>
              </div> */}
      </header>
      <Modal
        id="user-modal"
        className={`top-1 left-2 pr-4 pl-20 rounded-3xl animate-scale-up-tl`}
        z="z-20"
        isOpen={isUserModalOpen}
        onClose={handleToggleUserModal}
        hasCloseButton={false}
      >
        <ul className="text-violet-50 flex flex-col">
          <Link to="/profile" className="hover:underline">Perfil</Link>
          <Link to="/" onClick={signOut} className="hover:underline">Logout</Link>
        </ul>
      </Modal>
    </>
  );
}

export default Header;