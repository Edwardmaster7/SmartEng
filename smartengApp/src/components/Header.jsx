import profileImageSrc from "../assets/perfil.jpeg";
import Modal from "./Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../assets/Mediamodifier-Design-Template-3.png";
import ButtonComponent from "./ButtonComponent";
import { api } from "../services/api";
import { useAuth } from "../hooks/auth";
import { HiDotsVertical } from "react-icons/hi";


const Header = () => {
  const { user } = useAuth();

  const aClassName = "cursor-pointer px-2 text-base text-indigo-50 hover:text-white";
  const menuButtonsClassname =
    "px-2 text-base bg-indigo-400 hover:bg-indigo-500 rounded-xl drop-shadow-md text-indigo-50 hover:saturate-150";

  const path  ={
    home: "/",
    clients: "/clientes",
    quotes: "/orcamentos",
    stages: "/etapas",
    bdi: "/bdi",
    bases: "/bases"
  }

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

  function isMobileScreen() {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    return mediaQuery.matches;
  }

  const [isMenuButtonClicked, setIsMenuButtonClicked] = useState(false)

  const handleMenuButtonClick = () => {
    setIsMenuButtonClicked(!isMenuButtonClicked)
  }

  const { signOut } = useAuth()

  return (
    <>
      <button onClick={handleToggleUserModal} className="fixed top-3 ml-4 z-30">
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
            to={path.home}
            className={`${aClassName} ${
              location.pathname === path.home
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.home ? "hidden" : ""}`}
          >
            Home
          </Link>
          <Link
            id="clients-tab"
            to={path.clients}
            className={`${aClassName} ${
              location.pathname === path.clients
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.clients ? "hidden" : ""}`}
          >
            Clientes
          </Link>
          <Link
            id="quotes-tab"
            to={path.quotes}
            className={`${aClassName} ${
              location.pathname === path.quotes
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.quotes ? "hidden" : ""}`}
          >
            Orçamentos
          </Link>
          <Link
            id="stages-tab"
            to={path.stages}
            className={`${aClassName} ${
              location.pathname === path.stages
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.stages ? "hidden" : ""}`}
          >
            Etapas
          </Link>
          <Link
            id="bdi-tab"
            to={path.bdi}
            className={`${aClassName} ${
              location.pathname === path.bdi ? "font-bold" : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.bdi ? "hidden" : ""}`}
          >
            BDI
          </Link>
          <Link
            id="bases-tab"
            to={path.bases}
            className={`${aClassName} ${
              location.pathname === path.bases
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobileScreen && location.pathname !== path.bases ? "hidden" : ""}`}
          >
            Bases
          </Link>
        </nav>

        <div
          id=""
          className={`size-10 rounded-2xl ${isMobileScreen ? "hidden" : ""}`}
        ></div>

        <ButtonComponent
          onClick={handleMenuButtonClick}
          className={`rounded-2xl p-2 bg-indigo-500 dark:bg-violet-500 ${isMenuButtonClicked ? "outline outline-violet-300" : ""}`}
        >
          <HiDotsVertical className="size-6 text-violet-50" />
        </ButtonComponent>

        <div
          id="mobile-nav"
          className={`absolute flex flex-col backdrop-blur-sm border-transparent gap-3 right-2 top-20 z-10 ${!isMenuButtonClicked ? "hidden" : ""}`}
        >
          <button
            id="home-button"
            className={`${menuButtonsClassname} ${location.pathname === path.home ? "hidden" : ""}`}
          >
            <Link to={path.home}>Home</Link>
          </button>
          <button
            id="clients-button"
            className={`${menuButtonsClassname} ${location.pathname === path.clients ? "hidden" : ""}`}
          >
            <Link to={path.clients}>Clientes</Link>
          </button>
          <button
            id="quotes-button"
            className={`${menuButtonsClassname} ${location.pathname === path.quotes ? "hidden" : ""}`}
          >
            <Link to={path.quotes}>Orçamentos</Link>
          </button>
          <button
            id="stages-button"
            className={`${menuButtonsClassname} ${location.pathname === path.stages ? "hidden" : ""}`}
          >
            <Link to={path.stages}>Etapas</Link>
          </button>
          <button
            id="bdi-button"
            className={`${menuButtonsClassname} ${location.pathname === path.bdi ? "hidden" : ""}`}
          >
            <Link to={path.bdi}>BDI</Link>
          </button>
          <button
            id="bases-button"
            className={`${menuButtonsClassname} ${location.pathname === path.bases ? "hidden" : ""}`}
          >
            <Link to={path.bases}>Bases</Link>
          </button>
        </div>
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
          <Link to="/profile" className="hover:underline">
            Perfil
          </Link>
          <Link to={path.home} onClick={signOut} className="hover:underline">
            Logout
          </Link>
        </ul>
      </Modal>
    </>
  );
}

export default Header;