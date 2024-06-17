import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent"
import {
  HiArrowLeft,
  HiOutlineCamera,
  HiLockClosed,
  HiUser,
  HiMail,
} from "react-icons/hi";
import { RiShutDownLine } from "react-icons/ri";
import profileImageSrc from "../assets/perfil.jpeg"
import { Link } from "react-router-dom";

const Profile = () => {
    return (
      <div className="w-full h-screen">
        <Main className="px-6 pb-32 pt-12 gap-4 justify-center">
          <div />
          <Container className="animate-fade-in max-w-prose relative mx-auto flex flex-col justify-center bg-violet-50 px-6 pt-8 pb-20">
            <Link to="/" className="absolute z-10 left-9 top-9">
              <HiArrowLeft className="text-3xl text-violet-800 dark:text-violet-200 dark:hover:text-violet-50 hover:text-violet-400 hover:cursor-pointer" />
            </Link>
            <Link to="#" className="absolute z-10 right-9 top-8">
              <RiShutDownLine className="text-3xl text-violet-800 dark:text-violet-200 dark:hover:text-violet-50 hover:text-violet-400 hover:cursor-pointer" />
            </Link>

            <div id="avatar" className="flex justify-center relative mb-4">
              <img
                className="size-40 rounded-8xl"
                src={profileImageSrc}
                alt="Profile Image"
              />
              <label
                htmlFor="avatar"
                className="absolute flex items-center justify-center size-10 hover:cursor-pointer rounded-2xl -bottom-4 right-52 bg-violet-600 hover:bg-violet-400"
              >
                <HiOutlineCamera className="text-2xl text-violet-50" />
                <InputField
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <form action="" className="flex flex-col gap-4">
              <InputField
                type="text"
                name="username"
                label="Nome"
                id="username"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiUser />}
              />
              <InputField
                type="text"
                name="email"
                label="Email"
                id="username"
                className="rounded-xl py-3 mb-2 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiMail />}
              />
              <InputField
                type="password"
                name="actual-password"
                label="Senha atual"
                id="actual-password"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiLockClosed />}
              />
              <InputField
                type="password"
                name="new-password"
                label="Nova senha"
                id="new-password"
                className="rounded-xl py-3 text-lg dark:bg-indigo-100 focus:outline-violet-300 focus:outline-2 focus:outline-offset-2 dark:focus:outline-indigo-200"
                icon={<HiLockClosed />}
              />
              <div>
                <ButtonComponent
                  type="submit"
                  to="#"
                  alt="Salvar"
                  className="bg-violet-600 text-white px-4 py-2 mt-3 rounded-lg"
                  content="Salvar"
                />
              </div>
            </form>
          </Container>
          <div />
        </Main>
      </div>
    );
};

export default Profile;