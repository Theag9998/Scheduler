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
			const days = [...state.days]
			for (let day of days) {
				if (day.appointments.includes(id)) {
					day.spots--
				}
			}
			 setState({...state, appointments, days})}
			)
	}
	
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
				const days = [...state.days]
				for (let day of days) {
					if (day.appointments.includes(id)) {
						day.spots++
					}
				}
				setState({...state, appointments, days})}) 
	}

	return { state, setDay, bookInterview, cancelInterview }
}