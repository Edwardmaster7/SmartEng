import Main from "../components/Main";
import Container from "../components/Container";
import InputField from "../components/InputField";
import ButtonComponent from "../components/ButtonComponent";
import {
  HiArrowLeft,
  HiOutlineCamera,
  HiLockClosed,
  HiUser,
  HiMail,
} from "react-icons/hi";
import { RiShutDownLine } from "react-icons/ri";
import avatarPlaceholder from "../assets/Mediamodifier-Design-Template-3.png";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import { api } from "../services/api";

import { useAuth } from "../hooks/auth";

const Profile = () => {
  const { signOut, user, updateProfile } = useAuth();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // console.log(user)

  const avatarURL = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault(); // Add this line to prevent the default form submission behavior

    const updatedUser = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword,
      avatar: avatarFile,
    };

    const nameChanged = updatedUser.name !== "";
    const emailChanged = updatedUser.email !== "";
    const passwordChanged = updatedUser.password !== "";
    const oldPasswordChanged = updatedUser.old_password !== "";

    if (nameChanged || emailChanged) {
      // Update the user profile with the new name and/or email
      // console.log(`updated user avatar ${updatedUser.ava}`)
      await updateProfile({
        user: updatedUser,
        avatarFile: updatedUser.avatar,
      });

      // Optionally, you can display a success message or perform additional actions
      console.log("User profile updated successfully!");
    } else {
      alert("Nenhuma alteração feita no perfil do usuário.");
    }
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];

    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
  }

  return (
    <div className="h-screen w-full">
      <Main className="justify-center gap-4 px-6 pb-32 pt-12">
        <Container className="relative mx-auto flex max-w-prose animate-fade-in flex-col justify-center bg-violet-50 px-6 pb-20 pt-8">
          <Link to="/" className="absolute left-9 top-9 z-10">
            <HiArrowLeft className="text-3xl text-violet-800 hover:cursor-pointer hover:text-violet-400 dark:text-violet-200 dark:hover:text-violet-50" />
          </Link>
          <Link
            to="/"
            onClick={signOut}
            className="absolute right-9 top-8 z-10"
          >
            <RiShutDownLine className="text-3xl text-violet-800 hover:cursor-pointer hover:text-violet-400 dark:text-violet-200 dark:hover:text-violet-50" />
          </Link>

          <div id="avatar" className="relative mb-4 flex justify-center">
            <img
              className="size-32 md:size-40 rounded-6xl md:rounded-8xl"
              src={avatar}
              alt="Foto do Usuário"
            />
            <label
              htmlFor="avatar-input"
              className="absolute -bottom-4  md:right-52 flex size-10 items-center justify-center rounded-2xl bg-violet-600 hover:cursor-pointer hover:bg-violet-400"
            >
              <InputField
                id="avatar-input"
                name="avatar"
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <HiOutlineCamera className="text-2xl text-violet-50" />
            </label>
          </div>

          <form action="" className="flex flex-col gap-4">
            <InputField
              type="text"
              name="profile-username"
              label="Nome"
              id="username"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiUser />}
            />
            <InputField
              type="text"
              name="email"
              label="Email"
              id="username"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiMail />}
            />
            <InputField
              type="password"
              name="actual-password"
              label="Senha atual"
              id="actual-password"
              onChange={(e) => setOldPassword(e.target.value)}
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiLockClosed />}
            />
            <InputField
              type="password"
              name="new-password"
              label="Nova senha"
              id="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-xl py-3 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-violet-300 dark:bg-indigo-100 dark:focus:outline-indigo-200"
              icon={<HiLockClosed />}
            />
            <div>
              <ButtonComponent
                type="submit"
                to="#"
                onClick={handleUpdate}
                alt="Salvar"
                className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-white"
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
