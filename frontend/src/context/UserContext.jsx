import { createContext, useContext, useState, useEffect, Children } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState();

    const login = (token, userType) => {
        localStorage.setItem('token', token);
        setToken(token);
        setUser((prev) => ({
            ...prev,
            userType: userType
        }))
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <UserContext.Provider value ={{ user, token, login, logout, isLoggedIn: !!token }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);