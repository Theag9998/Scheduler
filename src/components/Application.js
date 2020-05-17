import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios
          .get('http://localhost:8001/api/days')),
      Promise.resolve(
        axios
          .get('http://localhost:8001/api/appointments')),
      Promise.resolve(
        axios
          .get('http://localhost:8001/api/interviewers')),
    ]).then((all) => {
      console.log(all)
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
          {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointments.map((appointment) => {
        const interview = getInterview(state, appointment.interview);
        return (
            <Appointment 
            key={appointment.id} 
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            />
        )
      })}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
