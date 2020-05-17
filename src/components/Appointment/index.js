import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode"

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show 
				student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
				/>
				
			)}
			{mode === EMPTY && (
				
				<Empty
				onAdd={() => transition(CREATE)}
				/>
			)}
			{mode === CREATE && (
				<Form 
				interviewers={[]}
				onSave={props.onSave}
				onCancel={() => back(EMPTY)}
				/>
			)}
		</article>
	);
}