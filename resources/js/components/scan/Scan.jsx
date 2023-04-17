import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../images/close.svg";
import check from "../../images/check.svg";
import "./Scan.css";
import { context } from "../context/context";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import errorIcon from "../../images/error.svg"
import Modal from "../modal/Modal";

export default function Scan({ event, onExit }) {
    const ctx = useContext(context);
    const studentID = useRef();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const modal = useRef();

    function handleSubmitAttendee(e) {
        e.preventDefault();
        if (studentID.current.value) {
            const data = {
                event_id: event.event_id,
                student_id: studentID.current.value,
                status: "present",
            };
            handlePostAttendee(data);
        }
    }
    async function handlePostAttendee(data) {
        setIsScanning(false)
        await axios
            .post(`${ctx.url}/attendee`, data, {
                headers: {
                    Authorization: `Bearer ${ctx.token}`,
                },
            })
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                setError(error.response.data);
            });

        setTimeout(() => {
            setResult(null);
            setError(null);
            setIsScanning(true);
        }, 1000);
        studentID.current.value = "";
    }
    function handleScan(data) {
        if (data && data.text) {
            const student_number = parseInt(data.text.split(", ")[0]);
            if (isNaN(student_number) || student_number === null) {
                setIsScanning(false)
                console.log("Error"); //TODO! DELETE THIS
                setError({
                    message: "Invalid QR Code",
                });
                setTimeout(() => {
                    setError(null);
                    setIsScanning(true);
                }, 1000);
            } else {
                const result = {
                    event_id: event.event_id,
                    student_id: student_number,
                    status: "present",
                };
                handlePostAttendee(result);
            }
        }
    }
    function handleError(err) {
        console.error(err);
    }
    return (
        <Modal>
            <div className="modal-content" ref={modal}>
                <img src={close} alt="" className="close" onClick={onExit} />
                <div className="scanner-con">
                    <h1 className="display">{event.event_name}</h1>
                    <p>Scan for attendance</p>
                    <div className="scanner">
                        {true && (
                            <QrReader
                                scanDelay={1000}
                                onError={handleError}
                                onResult={handleScan}
                                videoStyle={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "1rem",
                                }}
                            />
                        )}
                    </div>
                    <span>OR</span>
                    <form
                        className="student-input"
                        onSubmit={handleSubmitAttendee}
                    >
                        <input
                            type="number"
                            name="studentID"
                            id=""
                            placeholder="Enter Student Number"
                            className="studentID"
                            ref={studentID}
                        />
                        <button type="submit" className="btn">
                            ADD
                        </button>
                    </form>
                </div>
                <div className="scanner-info">
                    {isScanning && (
                        <>
                            <div className="loader">
                                <div className="square" id="sq1"></div>
                                <div className="square" id="sq2"></div>
                                <div className="square" id="sq3"></div>
                                <div className="square" id="sq4"></div>
                                <div className="square" id="sq5"></div>
                                <div className="square" id="sq6"></div>
                                <div className="square" id="sq7"></div>
                                <div className="square" id="sq8"></div>
                                <div className="square" id="sq9"></div>
                            </div>
                            <h1 className="display">Scanning...</h1>
                        </>
                    )}
                    {result && (
                        <>
                            <img src={check} />
                            <h1 style={{ color: "green" }}>
                                {result.student.student_id}
                            </h1>
                            <h2>{`${result.student.lname}, ${result.student.fname} `}</h2>
                            <h3>{`${result.student.block_section}-${result.student.course}`}</h3>
                        </>
                    )}
                    {error && (
                        <div className="error">
                            <img src={errorIcon} />
                            <h1 style={{ color: "red", fontSize: "2rem" }}>
                                {error.message}
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
