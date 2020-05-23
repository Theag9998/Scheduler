//return the appointments for the specific day
export function getAppointmentsForDay(state, day) {
	const filteredDays = state.days.filter( (days) => days.name === day)
	if (!filteredDays.length) {
		return []
	} 
	const appointmentIds = (filteredDays[0].appointments)
	const appointments = appointmentIds.map( (id) => {
		return state.appointments[id] 

	})
	return appointments
}

//return a list of interviewers to the Form component
export function getInterviewersForDay(state, day) {
	const filteredDays = state.days.filter( (days) => days.name === day)
	if (!filteredDays.length) {
		return []
	} 
	const interviewerIds = (filteredDays[0].interviewers)
	const interviewers = interviewerIds.map( (id) => {
		return state.interviewers[id] 

	})

	return interviewers
	
}

//return interview object that displays the name of the student and the correct interviewer data
export function getInterview(state, interview) {
	let results = {}
	if (!interview) {
		return null
	}
	const studentName = interview.student
	results['student'] = studentName
	for (let key in state.interviewers) {
		 if (interview.interviewer === state.interviewers[key].id) {
		 	results["interviewer"] =  state.interviewers[key]
		}
	}
	return results;

}