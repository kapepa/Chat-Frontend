import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday'
import { ru } from 'date-fns/locale';
import PropType from "prop-types";

function Time({date}){
	let currentTime = Date.now();
	let newTime = "";
	
	switch(true){
		case Date.parse(date) + 1000 * 60 > currentTime: 
			newTime = formatDistanceToNow(date, {locale: ru})
		break;
		case isToday(new Date(date)) : 
			newTime = format(new Date(date),'HH:mm');
			break;
		default:
			newTime = format(new Date(date),'dd/MM/yy');
			break;
	}

	return newTime
}

Date.propType = {
	date: PropType.date,
}

export default Time;