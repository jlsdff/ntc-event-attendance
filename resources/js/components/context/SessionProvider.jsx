import React from "react";
import {context} from "./context";

export default function SessionProvider({children}){

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        if(sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            const token = sessionStorage.getItem('token');
            setUser(user);
            setToken(token);
            setIsLoggedIn(true);
        }
    }, []);

    function Login(user, token){
        setUser(user);
        setToken(token);
        setIsLoggedIn(true);
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    }

    function Logout(){
        setUser(null);
        setToken(null);
        setIsLoggedIn(false);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    const value = {
        url:"https://ntc-event-attendance.com/api",
        isLoggedIn,
        user,
        token,
        Login,
        Logout
    }

    return(
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}