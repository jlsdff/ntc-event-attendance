import React, { useContext, useState } from "react";
import { context } from "../context/context";
import axios from "axios";
import "./Events.css";
import logo from "../../images/logo.png";
import Table from "./Table";
import CreateUpdateEvent from "./CreateUpdateEvent";

export default function Events({}) {
    const ctx = useContext(context);
    const [isCreating, setIsCreating] = useState(false);

    function handleOnExit(){
        setIsCreating(false);
    }

    function handleNewEvent(){
        setIsCreating(true);
    }

    async function handleLogout() {
        await axios
            .post(`${ctx.url}/logout`,{}, {
                headers: {
                    'Authorization': `Bearer ${ctx.token}`,
                },
            })
            .then((response) => {
                console.log(response);
                ctx.Logout();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <section className="main-section">
            <nav className="nav">
                <img src={logo} className="logo" />
                <h1>Events</h1>
                <a
                    href="#"
                    role="button"
                    onClick={handleLogout}
                    className="btn ghost logout"
                >
                    Logout
                </a>
                <button class="continue-application" onClick={handleNewEvent}>
                    <div>
                        <div class="pencil"></div>
                        <div class="folder">
                            <div class="top">
                                <svg viewBox="0 0 24 27">
                                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                                </svg>
                            </div>
                            <div class="paper"></div>
                        </div>
                    </div>
                    New Event
                </button>
            </nav>
            <div className="body">
                <Table isCreatedNewEvent={isCreating}/>
            </div>
            {
                isCreating && (
                    <CreateUpdateEvent onExit={handleOnExit}/>
                )
            }
        </section>
    );
}
