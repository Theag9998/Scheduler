
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