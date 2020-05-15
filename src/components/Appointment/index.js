import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
	return (
		<article className="appointment">
			<Header time={props.time} />
			{props.interview && (
				//interview={{ student: "Lydia Miller-Jones", interviewer }
				
				<Show 
				student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
				/>
				
			)}
			{!props.interview && (
				<Empty
				onAdd={props.onAdd}
				/>
			)}
		</article>
	);
}