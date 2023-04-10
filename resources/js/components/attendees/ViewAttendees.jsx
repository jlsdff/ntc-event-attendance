import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import close from "../../images/close.svg";
import "./ViewAttendees.css";
import { context } from "../context/context";
import download from "../../images/download.svg";
import axios from "axios";
import * as XLSX from "xlsx/xlsx.mjs";

export default function ViewAttendees({ event_id, onExit }) {
    const ctx = useContext(context);
    const [attendees, setAttendees] = useState([]);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios
            .get(`${ctx.url}/event/attendee/${event_id}`, {
                headers: {
                    Authorization: `Bearer ${ctx.token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setEvent(response.data.event);
                const attendees = [];
                response.data.attendees.forEach((attendee) => {
                    const time = new Date(
                        attendee.created_at
                    ).toLocaleTimeString("en-US", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                    });
                    const student = {
                        studentID: attendee.student.student_id,
                        firstName: attendee.student.fname,
                        lastName: attendee.student.lname,
                        courseCode: attendee.student.course_code,
                        yearLevel: attendee.student.year_level,
                        timeIn: time,
                    };
                    attendees.push(student);
                });
                setAttendees(attendees);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [event_id]);

    function exportAttendees() {
        const jsonData = attendees.map((attendee) => {
            return {
                "Student ID": attendee.studentID,
                "First Name": attendee.firstName,
                "Last Name": attendee.lastName,
                Course: attendee.courseCode,
                "Year Level": attendee.yearLevel,
                "Time In": attendee.timeIn,
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");
        XLSX.writeFile(workbook, `${event?.event_name} Attendees.xlsx`);
    }

    return (
        <Modal>
            <div className="view-attendees">
                <img src={close} onClick={onExit} className="close" />
                <a
                    role="button"
                    className="btn primary export-button"
                    onClick={exportAttendees}
                >
                    <img src={download} className="export-icon" />
                    <span>Export</span>
                </a>
                <h1 className="header">{`${event?.event_name} Attendees`}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Year Level</th>
                            <th>Time In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendees.map((attendee, index) => {
                            return (
                                <tr key={index}>
                                    <td>{attendee.studentID}</td>
                                    <td>{`${attendee.lastName}, ${attendee.firstName}`}</td>
                                    <td>{attendee.courseCode}</td>
                                    <td>{attendee.yearLevel}</td>
                                    <td>{attendee.timeIn}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
