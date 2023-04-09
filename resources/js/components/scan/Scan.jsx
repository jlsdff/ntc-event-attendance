import React, { useEffect, useRef, useState, useContext } from "react";
import close from "../../images/close.svg";
import check from '../../images/check.svg'
import "./Scan.css";
import { context } from "../context/context";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import Modal from "../modal/Modal";

export default function Scan({ event, onExit }) {
    const ctx = useContext(context);
    const [result, setResult] = useState(null);
    const studentID = useRef();
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
                console.error(error);
            });

        setTimeout(() => {
            setResult(null);
        }, 1000);
        studentID.current.value = "";
        console.log(data);
    }
    function handleScan(data) {
        if (data && data.text) {
            const student_number = parseInt(data.text.split(", ")[0]);
            const result = {
                event_id: event.event_id,
                student_id: student_number,
                status: "present"
            };
            handlePostAttendee(result);
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
                    {!result ? (
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
                    ) : (
                        <>
                            <img src={check}/>
                            <h1 style={{color:'green'}}>{result.student.student_id}</h1>
                            <h2>{`${result.student.lname}, ${result.student.fname} `}</h2>
                            <h3>{`${result.student.block_section}-${result.student.course}`}</h3>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
}
