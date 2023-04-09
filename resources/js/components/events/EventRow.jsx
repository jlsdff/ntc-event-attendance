import React from "react";
import editIcon from "../../images/edit.svg";
import deleteIcon from "../../images/delete.png";
import scanIcon from "../../images/scan.svg";
import viewIcon from "../../images/view.svg";

export default function EventRow({
    id,
    name,
    date,
    time,
    courses,
    yearLevels,
    onEdit,
    onDelete,
    viewAttendance,
    onAttendance,
}) {
    const _date = new Date(`${date} ${time}`);
    const event_date = _date.toDateString();
    const event_time = _date.toLocaleTimeString();

    function deleteEvent() {
        onDelete(id);
    }
    function editEvent() {
        onEdit({ id, name, date, time, courses, yearLevels });
    }
    function viewEventAttendance() {
        viewAttendance(id);
    }
    function beginAttendance() {
        onAttendance({ event_id: id, event_name: name });
    }

    return (
        <tr className="table-row">
            <td>{name}</td>
            <td>{event_date}</td>
            <td>{event_time}</td>
            <td>
                {courses
                    .map((c) => c.course_name)
                    .filter((c, i) => i < 4)
                    .join(", ")}{" "}
                ...
            </td>
            <td>{yearLevels.map((y) => y.year_level).join(", ")}</td>
            <td className="actions">
                <div>
                    <a
                        href="#"
                        role="button"
                        className="btn ghost"
                        onClick={deleteEvent}
                    >
                        <img src={deleteIcon} alt="" />
                    </a>
                    <a
                        href="#"
                        role="button"
                        className="btn ghost"
                        onClick={editEvent}
                    >
                        <img src={editIcon} alt="" />
                    </a>
                </div>
                <div>
                    <a
                        href="#"
                        role="button"
                        className="btn secondary"
                        onClick={viewEventAttendance}
                    >
                        <img src={viewIcon} alt="" />
                        <span>Attendees</span>
                    </a>
                    <a
                        href="#"
                        role="button"
                        className="btn primary"
                        onClick={beginAttendance}
                    >
                        <img src={scanIcon} alt="" />
                        <span>Scan</span>
                    </a>
                </div>
            </td>
        </tr>
    );
}
