import React, { useContext, useRef } from "react";
import { context } from "../context/context";
import axios from "axios";
import "./Login.css";
import logo from "../../images/logo.png";

export default function Login({}) {
    const ctx = useContext(context);

    const email = useRef();
    const password = useRef();
    const errorMessage = useRef();

    async function handleLogin(e) {
        e.preventDefault();
        const request = {
            email: email.current.value,
            password: password.current.value,
        };
        console.log(`${ctx.url}/login`);
        await axios
            .post(`${ctx.url}/login`, request)
            .then((response) => {
                const { user, token } = response.data;
                ctx.Login(user, token);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                errorMessage.current.innerText = "Invalid email or password";
            });
    }
    return (
        <section className="login-section">
            <form onSubmit={handleLogin}>
                {/* <input type="email" name="email" ref={email} />
                    <input type="password" name="password" ref={password} /> */}
                <img src={logo} className="ntc-logo" />
                <div className="input-group">
                    <label className="label">Email address</label>
                    <input
                        autoComplete="off"
                        name="Email"
                        id="Email"
                        className="input"
                        type="email"
                        ref={email}
                    />
                    <div></div>
                </div>
                <div className="input-group">
                    <label className="label">Password</label>
                    <input
                        autoComplete="off"
                        name="password"
                        id="password"
                        className="input"
                        type="password"
                        ref={password}
                    />
                    <div></div>
                </div>
                <p ref={errorMessage} style={{ color: "red" }}></p>
                <button type="submit">Login</button>
            </form>
        </section>
    );
}
