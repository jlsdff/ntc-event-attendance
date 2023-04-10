import React, { useContext } from "react";
import SessionProvider from "./components/context/SessionProvider";
import Main from "./components/main/Main";
import "./all.css";
import Scan from "./components/scan/Scan";
import CreateUpdateEvent from "./components/events/CreateUpdateEvent";
export default function App() {
    return (
        <SessionProvider>
            <Main />
        </SessionProvider>
    );
}
