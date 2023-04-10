import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "../modal/Modal";
import close from "../../images/close.svg";
import add from "../../images/add.svg";
import remove from "../../images/remove.svg";
import "./CreateUpdateEvent.css";
import axios from "axios";
import { context } from "../context/context";
export default function CreateUpdateEvent({ event, onExit }) {
    const ctx = useContext(context);
    const [yearLevels, setYearLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const eventName = useRef(null);
    const eventDate = useRef(null);
    const eventTime = useRef(null);
    const course = useRef(null);

    useEffect(() => {
        if (event) {
            const [
                event_id,
                event_name,
                event_date,
                event_time,
                inCourses,
                year_levels,
            ] = event;
            eventName.current.value = event_name;
            eventDate.current.value = event_date;
            eventTime.current.value = event_time;
            setYearLevels(year_levels);
            setCourses(inCourses);
            console.log(event);
        }
    }, [event]);
    function handleSubmit(e) {
        e.preventDefault();
        const request = {
            event_name: eventName.current.value,
            event_date: eventDate.current.value,
            event_time: eventTime.current.value,
            year_levels: yearLevels,
            courses: courses,
        };
        if (event) {
            axios
                .put(`${ctx.url}/event/${event[0]}`, request, {
                    headers: {
                        Authorization: `Bearer ${ctx.token}`,
                    },
                })
                .then((reponse) => {
                    console.log(reponse);
                    onExit();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .post(`${ctx.url}/event`, request, {
                    headers: {
                        Authorization: `Bearer ${ctx.token}`,
                    },
                })
                .then((reponse) => {
                    console.log(reponse);
                    onExit();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function handleYearLevel(yearLevel) {
        if (yearLevels.includes(yearLevel)) {
            setYearLevels((prev) => prev.filter((item) => item !== yearLevel));
        } else {
            setYearLevels((prev) => [...prev, yearLevel]);
        }
    }
    function addCourse() {
        const value = course.current.value.toUpperCase();
        setCourses((prev) => [...prev, value]);
        course.current.value = "";
    }
    function removeCourse(course) {
        setCourses((prev) => prev.filter((item) => item !== course));
    }

    return (
        <Modal>
            <div className="create-update-event">
                <h1 className="h1-head">
                    {event ? "Update Event" : "New Event"}
                </h1>
                <img src={close} className="close" onClick={onExit} />
                <form onSubmit={handleSubmit}>
                    <div className="form-1">
                        <label className="input-group">
                            <span className="input-label">Event Name</span>
                            <input
                                type="text"
                                className="input"
                                autoComplete="false"
                                required
                                ref={eventName}
                            />
                        </label>
                        <label className="input-group">
                            <span className="input-label">Event Date</span>
                            <input
                                type="date"
                                className="input"
                                autoComplete="false"
                                required
                                ref={eventDate}
                            />
                        </label>
                        <label className="input-group">
                            <span className="input-label">Event Time</span>
                            <input
                                type="time"
                                className="input"
                                autoComplete="false"
                                required
                                ref={eventTime}
                            />
                        </label>
                        <div className="input-group">
                            <span className="input-label">Year Levels</span>
                            <div className="year-levels">
                                {[1, 2, 3, 4].map((y, i) => {
                                    return (
                                        <_yearLevel
                                            key={i}
                                            yearLevel={y}
                                            isChecked={yearLevels.includes(y)}
                                            onClick={handleYearLevel}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="form-2">
                        <span className="input-label">Courses</span>
                        <div className="courses">
                            <label className="input-courses">
                                <input
                                    type="text"
                                    autoComplete="false"
                                    ref={course}
                                />
                                <a role="button" onClick={addCourse}>
                                    <img src={add} />
                                </a>
                            </label>
                        </div>
                        <ul className="course-list">
                            {courses.map((c, i) => {
                                return (
                                    <_course
                                        key={i}
                                        value={c}
                                        onRemove={removeCourse}
                                    />
                                );
                            })}
                        </ul>
                        <button type="submit" className="btn new-event">
                            {event ? "Update Event" : "New Event"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
function _course({ onRemove, value }) {
    function removeCourse() {
        onRemove(value);
    }
    return (
        <li className="course-item">
            <span>{value}</span>
            <a role="button" onClick={removeCourse}>
                <img src={remove} alt="" />
            </a>
        </li>
    );
}
function _yearLevel({ yearLevel, isChecked, onClick }) {
    const input = useRef(null);

    useEffect(() => {
        input.current.checked = isChecked;
    });

    function handleClick(e) {
        onClick(parseInt(e.target.value));
    }

    return (
        <div className="year-level">
            <input
                type="checkbox"
                className="input"
                autoComplete="false"
                value={yearLevel}
                onClick={handleClick}
                ref={input}
            />
            <span>{yearLevel}</span>
        </div>
    );
}
