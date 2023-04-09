import React, { useContext } from "react";
import SessionProvider from "./components/context/SessionProvider";
import Main from "./components/main/Main";
import "./all.css";
import Scan from "./components/scan/Scan";
import CreateUpdateEvent from "./components/events/CreateUpdateEvent";
export default function App() {
    return (
        <SessionProvider>
            {/* <Scan
                event={{ event_id: 18, event_name: "test" }}
                onExit={() => {
                    console.log("exit");
                }}
            /> */}
            <CreateUpdateEvent event={{
                event_name: "event name",
                event_date: "2021-05-05",
                event_time: "12:00:00",
                year_levels: [1, 2, 3],
                courses: ["BSIT", "BSCS"],
            }}/>
        </SessionProvider>
    );
}
