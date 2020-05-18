import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
		};
		transition(SAVING)
		props.bookInterview(props.id, interview)
		.then(() => {transition(SHOW)})
    
	}
	
	function cancelInterview(name) {
		const interview = {
			student: name,
			interviewer: null
		}
		transition(DELETING)
		props.cancelInterview(props.id, interview)
		.then(() => {transition(EMPTY)})
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show 
				student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={() => transition(CONFIRM)}
				/>
				
			)}
			{mode === EMPTY && (
				
				<Empty
				onAdd={() => transition(CREATE)}
				/>
			)}
			{mode === CREATE && (
				<Form 
				interviewers={props.interviewers}
				onSave={save}
				onCancel={() => back(EMPTY)}
				/>
			)}
			{mode === SAVING && (
				<Status
				message={SAVING}
				/>
			)}
			{mode === DELETING && (
				<Status
				message={DELETING}
				/>
			)}
			{mode === CONFIRM && (
				<Confirm
				message={"Are you sure you would like to delete?"}
				onCancel={back}
				onConfirm={cancelInterview}
				/>
			)} 
		</article>
	);
}