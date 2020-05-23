import {useState, useEffect} from "react"
import axios from "axios";

export default function useApplicationData() {

	const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
	})
	const setDay = day => setState({ ...state, day });
//retrieve data from scheduler-api and store into state
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
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
	}, [])
  
  //submit a put request to update the database with the new appointment data
	function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
      return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
			.then (() => {
        const days = state.days.map(day => {
          if (state.day === day.name && !state.appointments[id].interview) {
            //update the number of spots remaining
						return {...day, spots: day.spots - 1}
          }
          return day
        })

			 setState({...state, appointments, days})}
			)
	}
	//submit a delete request to update the database to remove the appointment data
	function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => { 
        const days = state.days.map(day => {
          if (state.day === day.name) {
            //update the number of spots remaining
						return {...day, spots: day.spots + 1}
          }
          return day
        })
				setState({...state, appointments, days})}) 
	}

	return { state, setDay, bookInterview, cancelInterview }
}