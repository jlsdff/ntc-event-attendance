import React from "react";
import SessionProvider from "./components/context/SessionProvider";
import Main from "./components/main/Main";
import "./all.css";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <SessionProvider>
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </SessionProvider>
    );
}
