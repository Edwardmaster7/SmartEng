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

  const aClassName =
    "cursor-pointer px-2 text-base text-indigo-50 hover:text-white";
  const menuButtonsClassname =
    "p-2 text-base bg-violet-700 hover:bg-violet-500 rounded-xl drop-shadow-md text-violet-50";

  const path = {
    home: "/",
    clients: "/clientes",
    quotes: "/orcamentos",
    stages: "/etapas",
    bdi: "/bdi",
    bases: "/bases",
  };

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarURL);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleToggleUserModal = () => {
    if (isUserModalOpen) {
      setIsUserModalOpen(false);
    } else {
      setIsUserModalOpen(true);
    }
  };

  function isMobileScreen() {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    return mediaQuery.matches;
  }

  const isMobile = isMobileScreen();

  const [isMenuButtonClicked, setIsMenuButtonClicked] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuButtonClicked(!isMenuButtonClicked);
  };

  const { signOut } = useAuth();

  const links = [
    { id: "home", path: "/", label: "Home" },
    { id: "clients", path: "/clientes", label: "Clientes" },
    { id: "quotes", path: "/orcamentos", label: "Orçamentos" },
    { id: "stages", path: "/etapas", label: "Etapas" },
    { id: "bdi", path: "/bdi", label: "BDI" },
    { id: "bases", path: "/bases", label: "Bases" },
  ];

  return (
    <>
      <button onClick={handleToggleUserModal} className="fixed top-3 z-30 ml-4">
        <img
          className={`size-10 rounded-2xl outline-offset-2 ${!isMobile ? "hover:outline hover:outline-violet-300" : ""} ${isUserModalOpen ? "outline outline-violet-300 delay-75" : ""}`}
          src={avatar}
          alt="Profile Image"
        />
      </button>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-indigo-800 p-4 shadow-md">
        <div id="" className={`size-10 rounded-2xl`} />

        <nav className="items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`${aClassName} ${
                location.pathname === link.path
                  ? "font-bold"
                  : "hover:font-medium"
              } ${isMobile && location.pathname !== link.path ? "hidden" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          {/* 
          <Link
            id="home-tab"
            to={path.home}
            className={`${aClassName} ${
              location.pathname === path.home
                ? "font-bold"
                : "hover:font-medium"
            } ${isMobile && location.pathname !== path.home ? "hidden" : ""}`}
          >
            Home
          </Link> */}
        </nav>

        <ButtonComponent
          onClick={handleMenuButtonClick}
          className={`rounded-2xl bg-indigo-500 p-2 dark:bg-violet-500 ${isMenuButtonClicked ? "outline outline-violet-300" : ""} ${!isMobile ? "hidden" : ""}`}
        >
          <HiDotsVertical className="size-6 text-violet-50" />
        </ButtonComponent>

        <div
          id="mobile-nav"
          className={`absolute right-2 top-20 z-10 flex flex-col gap-3 border-transparent backdrop-blur-sm ${!isMenuButtonClicked ? "hidden" : ""}`}
        >
          {links.map((link) => (
            <button
              id={`${link.id}-button`}
              className={`${menuButtonsClassname} ${location.pathname === link.path ? "hidden" : ""}`}
            >
              <Link to={link.path}>{link.label}</Link>
            </button>
          ))}
        </div>
      </header>
      <Modal
        id="user-modal"
        className={`left-2 top-1 flex animate-scale-up-tl rounded-3xl pl-8 pr-4`}
        z="z-20"
        isOpen={isUserModalOpen}
        onClose={handleToggleUserModal}
        hasCloseButton={false}
      >
        <div id="" className={`size-10 rounded-2xl`} />
        <ul className="flex flex-col text-violet-50">
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
};

export default Header;
