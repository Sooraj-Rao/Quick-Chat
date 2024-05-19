import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}


// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
    const [cookies, setCookie] = useCookies(['user']);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user && cookies?.user && cookies?.jwt) {
            setUser({ user: cookies?.user, token: cookies?.jwt })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies])

    return (
        <AuthContext.Provider value={{ user, setUser, cookies, setCookie }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Context