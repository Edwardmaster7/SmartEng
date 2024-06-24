import { createContext, useContext, useEffect } from "react"
import { useState } from 'react'

import { api } from '../services/api'

const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        const data = { email, password }
        
        try {
            const response = await api.post("/sessions", data)
            const { user, token } = response.data

            localStorage.setItem("@smarteng:user", JSON.stringify(user))
            localStorage.setItem("@smarteng:token", token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({ user, token })

        } catch (error) {
            if(error.response){
                return alert(`${error.response.data.message}`)
            }else{
                alert("Ocorreu um erro no login...")
            }
        }

    }

    function signOut() {
        localStorage.removeItem("@smarteng:user")
        localStorage.removeItem("@smarteng:token")

        setData({})
    }

    async function updateProfile({ user, avatarFile }) {

        try {
            if(avatarFile) {
                // console.log(`Avatar file: ${avatarFile}`)

                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }

            const userUp = await api.put("/users/", user);
            // console.log(user.data)

            localStorage.setItem("@smarteng:user", JSON.stringify(userUp.data));
            setData({ user:userUp.data, token: data.token });
            alert("Perfil atualizado com sucesso!");

        } catch (error) {
            if(error.response.data.message) {
                alert(
                  `Erro ao atualizar o perfil. Tente novamente.\n${error.response.data.message}`,
                );
            } else {
                alert("Ocorreu um erro ao atualizar o perfil...");
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@smarteng:user")
        const token = localStorage.getItem("@smarteng:token")

        if (token && user) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setData({ user: JSON.parse(user), token })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, updateProfile, user: data.user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}

export { AuthProvider, useAuth }; 