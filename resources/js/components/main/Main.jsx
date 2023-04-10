import React, { useContext } from "react";
import {context} from "../context/context"
import Login from "../Login/Login";
import Events from "../events/Events";
import ViewAttendees from "../attendees/ViewAttendees";


export default function Main({}){

    const ctx = useContext(context);
    
    return (
        <main>
            {
                ctx.isLoggedIn ? (
                    <Events/>
                ): (
                    <Login/>
                )
            }
        </main>
    )
}