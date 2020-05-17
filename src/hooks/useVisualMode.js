import {useState} from "react";


export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function(mode, replace = false) {
		if (replace) { 
			history[history.length -1] = mode
		} else {
			history.push(mode);
		}
    setMode(mode);
	}
	const back = function() {
		if (history.length > 1) {
			history.pop()
			setMode(history[history.length - 1])
		}
	}
  return { mode, transition, back };
}

// setMode(mode)
// history.push(mode)
// if (replace === true) {
// 	history.pop(mode)
// }

// }

// const back = function() {
// if (history.length > 1) {
// 	history.pop()
// 	setMode(history[history.length - 1])
	
// }
// }