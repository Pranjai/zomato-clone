import { createContext, useContext, useState, useEffect, Children } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
    }

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value ={{ user, token, login, logout, isLoggedIn: !!token }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);