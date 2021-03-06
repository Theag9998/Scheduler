import {useState} from "react";

//custom hook that manages the visual mode of any component
export default function useVisualMode(initial) {
	const [ history, setHistory ] = useState([initial]);
	

	const transition = function(mode, replace = false) {
		if (replace) { 
			setHistory(prev => {
				
				const newHistory = [...prev];
				newHistory[prev.length -1] = mode
				
				return newHistory;
			})
		} else {
			setHistory((prev) => {
				const newHistory = [...prev]
				newHistory.push(mode)
				return newHistory;
			})
		}
	}
	const back = function() {
		if (history.length  > 1) {
			setHistory((prev) => {
				const newHistory = [...prev]
				newHistory.pop()
				return newHistory;
			})
		}
	}
	
  return { mode: history[history.length -1], transition, back };
}
