import React, { useCallback, useContext, useEffect, useState } from "react";
import { context } from "../context/context";
import axios from "axios";
import EventRow from "./EventRow";
import "./Table.css";
import Scan from "../scan/Scan";

export default function Table() {
    const ctx = useContext(context);
    const [activeEvent, setActiveEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const fetchEvents = useCallback(async () => {
        const data = await axios
            .get(`${ctx.url}/event`, {
                headers: {
                    Authorization: `Bearer ${ctx.token}`,
                },
            })
            .then((response) => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    function handleDeleteEvent(event_id) {
        const config = {
            headers: {
                Authorization: `Bearer ${ctx.token}`,
            },
        };
        axios
            .delete(`${ctx.url}/event/${event_id}`, config)
            .then((response) => {
                fetchEvents();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleEditEvent(event) {
        console.log(event);
    }
    function handleViewAttendance(event_id) {
        console.log(event_id);
    }
    function ScanQRCode(event) {
        setActiveEvent(event);
        setIsScanning(true);
    }
    function handleOnExit() {
        setIsScanning(false);
        setActiveEvent(null);
    }

    return (
        <>
            <div>
                
            </div>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Courses</th>
                        <th>Year Levels</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length === 0 && (
                        <tr>
                            <td
                                colSpan="6"
                                style={{ textAlign: "center", color: "red" }}
                            >
                                No events found
                            </td>
                        </tr>
                    )}
                    {events.map((event) => {
                        return (
                            <EventRow
                                key={event.event_id}
                                id={event.event_id}
                                name={event.event_name}
                                date={event.event_date}
                                time={event.event_time}
                                courses={event.courses}
                                yearLevels={event.year_levels}
                                onDelete={handleDeleteEvent}
                                onEdit={handleEditEvent}
                                viewAttendance={handleViewAttendance}
                                onAttendance={ScanQRCode}
                            />
                        );
                    })}
                </tbody>
            </table>
            {isScanning && <Scan event={activeEvent} onExit={handleOnExit} />}
        </>
    );
}
